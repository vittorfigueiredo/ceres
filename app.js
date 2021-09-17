require("dotenv").config();
const express = require("express");
const { UploadController } = require("./src/controllers/sendImage");

const app = express();
const port = 3333;

app.use(express.json());

const uploadController = new UploadController();

app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" });
});

app.post("/upload", uploadController.send);

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`);
});
