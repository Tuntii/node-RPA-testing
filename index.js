// const pupper = require('puppeteer');

// (async () => {
//     // Browser
//     const start = await pupper.launch({headless: 'new'});
//     const NewPage = await start.newPage();
//     await NewPage.goto('http://www.tunti35.com')
// })();
const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless:false})
	const page = await browser.newPage();
	await page.goto('https://www.tunti35.com/');
	
	
})();