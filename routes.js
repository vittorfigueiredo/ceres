const express = require("express");
const { UploadController } = require("./src/controllers/UploadController");

const router = express.Router()

const uploadController = new UploadController();

router.get("/", (request, response) => {
  return response.json({
    Luke: "Mas eu não acredito!",
    Yoda: "É por isso que você fracassa!"
  });
});

router.post("/upload", uploadController.send);

module.exports = { router };
