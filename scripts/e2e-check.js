#!/usr/bin/env node
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const previewUrl = process.env.PREVIEW_URL || 'http://localhost:4173';
const routes = ['/', '/trade', '/portfolio', '/news', '/community', '/settings', '/broker-integration', '/chatbot'];

async function run() {
  // Wait for the preview server to be reachable before launching Puppeteer.
  async function waitForServer(url, timeout = 20000, interval = 500) {
    const { URL } = (await import('url'));
    const http = (await import('http')).default || (await import('http'));
    const https = (await import('https')).default || (await import('https'));

    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        const u = new URL(url);
        const lib = u.protocol === 'https:' ? https : http;

        const ok = await new Promise((resolve) => {
          const req = lib.request({ method: 'HEAD', hostname: u.hostname, port: u.port, path: u.pathname }, (res) => {
            resolve(res.statusCode && res.statusCode < 400);
          });
          req.on('error', () => resolve(false));
          req.setTimeout(3000, () => { req.destroy(); resolve(false); });
          req.end();
        });

        if (ok) return true;
      } catch (e) {
        // ignore and retry
      }
      await new Promise(r => setTimeout(r, interval));
    }
    return false;
  }

  console.log(`Checking preview server at ${previewUrl}/dev-auth.html ...`);
  let up = await waitForServer(previewUrl + '/dev-auth.html', 5000, 500);
  let previewProcess = null;
  if (!up) {
    console.log('Preview server not reachable; spawning `npm run preview`...');
    // Spawn npm run preview in a child process
    const isWin = process.platform === 'win32';
    const npmCmd = isWin ? 'npm.cmd' : 'npm';
    try {
      // Use shell:true to avoid spawn EINVAL on some Windows setups
      previewProcess = spawn(npmCmd, ['run', 'preview'], { stdio: ['ignore', 'pipe', 'pipe'], cwd: process.cwd(), shell: true });

      previewProcess.stdout.on('data', d => process.stdout.write(`[preview] ${d}`));
      previewProcess.stderr.on('data', d => process.stderr.write(`[preview] ${d}`));
    } catch (spawnErr) {
      console.error('Failed to spawn preview process:', spawnErr);
      process.exitCode = 6;
      return;
    }

    // Wait longer for the preview to boot
    up = await waitForServer(previewUrl + '/dev-auth.html', 30000, 500);
    if (!up) {
      console.error('Preview did not become reachable after spawning. Aborting E2E.');
      if (previewProcess) previewProcess.kill();
      process.exitCode = 5;
      return;
    }
  }

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

  // Prepare output dir for artifacts
  const outDir = path.resolve(process.cwd(), 'scripts', 'e2e-output');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  try {
    console.log('Opening dev-auth to seed tokens...');
    await page.goto(previewUrl + '/dev-auth.html', { waitUntil: 'networkidle2' });
    const seedBtn = await page.$('#seedBtn');
    if (!seedBtn) {
      throw new Error('Seed button not found on /dev-auth.html');
    }
    await seedBtn.click();
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
    console.log('Seeded auth, current URL:', page.url());

    const results = [];

    for (const route of routes) {
      const target = previewUrl + route;
      console.log(`Checking route ${route} -> ${target}`);
      await page.goto(target, { waitUntil: 'networkidle2' });
      await page.waitForTimeout(500);

      const currentUrl = page.url();
      const redirectedToAuth = currentUrl.includes('/auth');
      const content = await page.content();
      const contentSize = content.length;

      // Try clicking an <a> link to the same route if present to test client-side navigation
      let clickOk = false;
      try {
        const link = await page.$(`a[href='${route}']`);
        if (link) {
          await link.click();
          await page.waitForTimeout(500);
          clickOk = page.url().includes(route);
        }
      } catch (e) {
        // ignore
      }

      results.push({ route, currentUrl, redirectedToAuth, contentSize, clickOk });
      console.log(`  -> url=${currentUrl} authRedirect=${redirectedToAuth} size=${contentSize} clickOk=${clickOk}`);
    }

    const failed = results.filter(r => r.redirectedToAuth);
    if (failed.length > 0) {
      console.error('E2E routing check failed for routes redirected to /auth:', failed.map(f => f.route));
      const ts = Date.now();
      const snapPath = path.join(outDir, `failed-${ts}.png`);
      const htmlPath = path.join(outDir, `failed-${ts}.html`);
      try {
        await page.screenshot({ path: snapPath, fullPage: true });
        const html = await page.content();
        fs.writeFileSync(htmlPath, html, 'utf8');
        console.log(`Saved screenshot to ${snapPath} and html to ${htmlPath}`);
      } catch (e) {
        console.error('Failed to save artifacts:', e);
      }
      await browser.close();
      if (previewProcess) previewProcess.kill();
      process.exitCode = 2;
      return;
    }

    console.log('E2E routing check passed: no routes redirected to /auth after seeding auth.');
    await browser.close();
    process.exitCode = 0;
  } catch (err) {
    console.error('E2E check error:', err);
    try {
      const ts = Date.now();
      const snapPath = path.join(outDir, `error-${ts}.png`);
      const htmlPath = path.join(outDir, `error-${ts}.html`);
      await page.screenshot({ path: snapPath, fullPage: true }).catch(() => {});
      const html = await page.content().catch(() => null);
      if (html) fs.writeFileSync(htmlPath, html, 'utf8');
      console.log(`Saved error artifacts to ${outDir}`);
    } catch (e) {
      console.error('Failed to capture error artifacts:', e);
    }
    await browser.close();
    if (previewProcess) previewProcess.kill();
    process.exitCode = 3;
  }

  // Ensure spawned preview is killed after success as well
  if (previewProcess) {
    try { previewProcess.kill(); } catch (e) { }
  }
}

run();
