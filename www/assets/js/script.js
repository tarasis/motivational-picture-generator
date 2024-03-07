import axios from "axios";

const server = axios.create({
    baseURL: "http://localhost:4200",
});

document
    .getElementById("submit-button")
    .addEventListener("click", async function (event) {
        event.preventDefault();
        const form = document.getElementById("form");
        const formData = new FormData(form);
        const title = formData.get("title");
        const sentence = formData.get("sentence");
        const url = formData.get("url");
        const colors = formData.getAll("colors");
        const data = { title, sentence, url, colors };
        try {
            const response = await server.post("/submit/", data);
            // const imageUrl = response.data;
            // document.getElementById("image").src = imageUrl;
        } catch (error) {
            console.error(error);
        }
    });
