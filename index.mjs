import express from "express";
import "dotenv/config";

import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

import fs from "fs";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.static("www"));

app.get("/submit/:mpgParams", (req, res) => {
    // console.log("🚀 ~ app.get ~ req:", req);
    // Get any supplied parameters, this keeps it clean
    // if I pass more parameters in the future
    const mpgParams = req.query;
    console.log("🚀 ~ app.get ~ mpgParams:", mpgParams);

    const worker = new Worker("./image-generator.cjs", {
        workerData: {
            mpgParams,
        },
    });

    // nicer would be to return a link the user
    // can click to download the image
    // or better yet dynamically load it into the original page in an iframe or ssg thing
    // but that might require moving project
    // to a framework like react/astro
    worker.on("message", (message) => {
        if (message.type === "image") {
            res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": message.data.length,
            });
            res.end(message.data);

            // save the image - temporary for now
            // fs.writeFileSync(
            //     `received_image-${message.port}.png`,
            //     message.data
            // );
        }
    });

    worker.on("error", (err) => {
        // Handle errors from the worker
        console.error(err);
        res.status(500).send("Internal Server Error");
    });

    worker.on("exit", (code) => {
        if (code !== 0) {
            // Handle non-zero exit codes
            console.error(new Error(`Worker stopped with exit code ${code}`));
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
