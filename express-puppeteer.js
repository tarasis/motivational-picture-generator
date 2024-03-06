const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const express = require("express");

const app = express();

const folderToServe = "/Users/tarasis/Programming/websites/rmcg.dev/www/";

let dynamicPort = 6100;

app.get("/screenshot", async (req, res) => {
    //pretend generated html
    const dynamicPage = express();
    // console.log("🚀 ~ app.get ~ dynamicPage:", dynamicPage);
    const currentDynamicPort = dynamicPort++;
    console.log("🚀 ~ app.get ~ currentDynamicPort:", currentDynamicPort);
    dynamicPage.use(
        // express.static("/Users/tarasis/Programming/websites/rmcg.dev/www")
        express.static(folderToServe)
    );

    const dynamicServer = dynamicPage.listen(currentDynamicPort, async () => {
        console.log(
            `Dynamic server is running at http://localhost:${currentDynamicPort}`
        );

        const browser = await puppeteer.launch();
        // console.log("🚀 ~ dynamicServer ~ browser:", browser)
        const page = await browser.newPage();
        // await page.goto(req.query.url); // URL is given by the "user" (your client-side application)
        await page.goto(`http://localhost:${currentDynamicPort}`); // URL is given by the "user" (your client-side application)

        await page.waitForResponse((response) => response.status() === 200);
        await scrollPageToBottom(page);
        const screenshotBuffer = await page.screenshot({ fullPage: true });

        // Respond with the image
        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": screenshotBuffer.length,
        });
        res.end(screenshotBuffer);
        // other option is just to save the file to disk
        // await page.screenshot({ path: 'example.png' });
        // Close the browser

        await browser.close();
        console.log(
            `Closing dynamic server http://localhost:${currentDynamicPort}`
        );
        await dynamicServer.close();
    });
});

app.listen(4000, () => {
    console.log("opened server on 4000");
});
