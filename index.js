// const pupper = require('puppeteer');

// (async () => {
//     // Browser
//     const start = await pupper.launch({headless: 'new'});
//     const NewPage = await start.newPage();
//     await NewPage.goto('http://www.tunti35.com')
// })();
// 
// const selector = ['#post-74 > div.ast-post-format-.single-layout-1.ast-no-date-box > header > h1','#post-74 > div > div.post-content.ast-width-md-6 > h2 > a']

// function pupper() { 
//     (async () => {
//         const browser = await puppeteer.launch({headless:false})

//         const page = await browser.newPage();
//         await page.goto('https://www.tunti35.com/blog');
//         await page.setViewport({width: 1920, height: 1080})
//         ;
//         await page.waitForSelector(selector[1]);
//         await page.click(selector[1]);
//         const inner_html = await page.$eval('#post-74 > div.ast-post-format-.single-layout-1.ast-no-date-box > header > h1', element => element.innerHTML);
//         console.log(inner_html)
//     })();
// }

// pupper()
const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require('path');
const downloadPath = path.resolve('img');


function playground() {
    (async () => {
        let browser = await puppeteer.launch({headless:false});
        let page = await browser.newPage();
        const client = await page.target().createCDPSession()
        await client.send('Page.setDownloadBehavior', {
          behavior: 'allow',
          downloadPath: downloadPath,
        })
       
        await page.setViewport({width: 1920, height: 1080});
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() == 'stylesheet' || req.resourceType() == 'image' || req.resourceType() == 'font' || req.resourceType() == 'script') {
                req.abort();
            }
            else {
                req.continue();
            }
        })
        await page.goto('http://127.0.0.1:5500/sandbox-area/');
        
        await page.click('body > a');

        await page.addStyleTag({ content: ' .down { display:block !important;}'});

        await page.click('body > .down > a');
    })();
}

playground();
