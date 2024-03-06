import puppeteer from "puppeteer";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";
import express from "express";
import "dotenv/config";

const folderToServe = "/Users/tarasis/Programming/websites/rmcg.dev/www/";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.static(folderToServe));
app.get("/screenshot", async (req, res) => {
    const dynamicPage = express();
    dynamicPage.use(express.static(folderToServe));

    const dynamicServer = dynamicPage.listen(0, async () => {
        const dynamicPort = dynamicServer.address().port;
        console.log(
            `Dynamic server is running at http://localhost:${dynamicPort}`
        );

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://localhost:${dynamicPort}`);

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
        console.log(`Closing dynamic server http://localhost:${dynamicPort}`);

        await dynamicServer.close();
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
