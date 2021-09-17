require("dotenv").config();
const express = require("express");
const { UploadController } = require("./src/controllers/UploadController");

const app = express();

app.use(express.json());

const uploadController = new UploadController();

app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" });
});

app.post("/upload", uploadController.send);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Running in http://localhost:${process.env.PORT}`);
});
