const express = require("express");
const { UploadController } = require("./src/controllers/UploadController");

const router = express.Router()

const uploadController = new UploadController();

router.get("/", (request, response) => {
  return response.json({ node: process.version});
});

router.post("/upload", uploadController.send);

module.exports = { router };
