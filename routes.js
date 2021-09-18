const express = require("express");
const { verifyJWT } = require("./src/middlewares/AuthorizationMiddleware");
const { UploadController } = require("./src/controllers/UploadController");
const { AuthenticationController } = require("./src/controllers/AuthenticationController");

const router = express.Router()

const uploadController = new UploadController();
const authenticationController = new AuthenticationController();

router.get("/", (request, response) => {
  return response.json({
    Luke: "Mas eu não acredito!",
    Yoda: "É por isso que você fracassa!"
  });
});

router.post("/auth", (authenticationController.auth));
router.post("/upload", verifyJWT, uploadController.send);

module.exports = { router };
