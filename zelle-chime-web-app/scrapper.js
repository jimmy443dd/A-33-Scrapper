const puppeteer = require('puppeteer');
const { extractRelevantEmails } = require('./extract');
const { wait, log } = require('./utils');

async function runScraper(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  let lastHeight = 0;
  let sameCount = 0;

  log('🔄 Scrolling...');

  while (sameCount < 3) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await wait(2000);

    const newHeight = await page.evaluate(() => document.body.scrollHeight);

    if (newHeight === lastHeight) {
      sameCount++;
      log(`📉 No new content (x${sameCount})`);
    } else {
      sameCount = 0;
      lastHeight = newHeight;
      log(`⬇️ Scrolled to: ${newHeight}`);
    }
  }

  log('✅ Done scrolling. Extracting text...');

  const bodyText = await page.evaluate(() => document.body.innerText);
  const emails = extractRelevantEmails(bodyText);

  await browser.close();
  return emails;
}

module.exports = { runScraper };
