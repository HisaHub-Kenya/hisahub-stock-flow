#!/usr/bin/env node
// Puppeteer script to open the preview server and seed localStorage with demo tokens
import puppeteer from 'puppeteer';

const previewUrl = process.env.PREVIEW_URL || 'http://localhost:4173';
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(previewUrl + '/dev-auth.html', { waitUntil: 'networkidle2', timeout: 20000 });
    // Click the seed button
    await page.click('#seedBtn');
    // wait for redirect to root
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
    console.log('Seeded auth and navigated to', await page.url());
  } catch (e) {
    console.error('Seed script failed:', e);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
