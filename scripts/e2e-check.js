#!/usr/bin/env node
import puppeteer from 'puppeteer';

const previewUrl = process.env.PREVIEW_URL || 'http://localhost:4173';
const routes = ['/', '/trade', '/portfolio', '/news', '/community', '/settings', '/broker-integration', '/chatbot'];

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

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
      await browser.close();
      process.exitCode = 2;
      return;
    }

    console.log('E2E routing check passed: no routes redirected to /auth after seeding auth.');
    await browser.close();
    process.exitCode = 0;
  } catch (err) {
    console.error('E2E check error:', err);
    await browser.close();
    process.exitCode = 3;
  }
}

run();
