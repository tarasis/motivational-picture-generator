const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const express = require("express");

const { parentPort, workerData } = require("worker_threads");

const folderToServe =
    "/Users/tarasis/Programming/websites/rmcg.dev/www/FrontendMentor/newbie/social-links-profile/";

const dynamicPage = express();
dynamicPage.use(express.static(folderToServe));

const dynamicServer = dynamicPage.listen(0, async () => {
    const dynamicPort = dynamicServer.address().port;
    console.log(`Dynamic server is running at http://localhost:${dynamicPort}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${dynamicPort}`);

    await page.waitForResponse((response) => response.status() === 200);

    await scrollPageToBottom(page);

    const screenshotBuffer = await page.screenshot({ fullPage: true });

    // other option is just to save the file to disk
    // await page.screenshot({ path: 'example.png' });
    // Close the browser

    await browser.close();
    console.log(`Closing dynamic server http://localhost:${dynamicPort}`);

    await dynamicServer.close();

    parentPort.postMessage({
        type: "image",
        data: screenshotBuffer,
        port: dynamicPort,
    });
});
