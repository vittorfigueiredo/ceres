const { s3Client } = require("../database/S3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { makeFileName } = require("../functions/MakeFileName");
const { verifyBase64 } = require("../functions/VerifyBase64");

class UploadController {
  async send(request, response) {
    const { base64, secret, extension } = request.body;

    if (secret === undefined) {
      return response.status(400).json({
        success: false,
        message: "O parâmetro secret é obrigatório!",
      });
    }

    if (secret.length === 0) {
      return response.status(400).json({
        success: false,
        message: "O parâmetro secret não pode ser vazio!",
      });
    }

    if (secret === process.env.SECRET_KEY) {
      if (base64 === undefined) {
        return response.status(400).json({
          success: false,
          message: "O parâmetro base64 é obrigatório!",
        });
      }

      if (base64.length === 0) {
        return response.status(400).json({
          success: false,
          message: "O parâmetro base64 não pode ser vazio!",
        });
      }

      const isBase64 = verifyBase64(base64);

      if (!isBase64) {
        return response.status(400).json({
          success: false,
          message: "Informe um base64 válido!",
        });
      }

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: makeFileName(32) + "." + extension === "pdf" ? "pdf" : "jpg",
        Body: Buffer.from(base64, "base64"),
        ContentEncoding: "base64",
        ContentType: extension === "pdf" ? "application/pdf" : "image/jpeg",
      };

      // Create an object and upload it to rhe Amazon S3 bucket.
      try {
        const results = await s3Client.send(new PutObjectCommand(params));

        if (results.$metadata.httpStatusCode !== 200) {
          return response.status(500).json({
            success: false,
            message: "Erro inesperado!",
          });
        }

        return response.status(201).json({
          success: true,
          url: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
        });
      } catch (err) {
        console.log("Error", err);
      }
    }
    return response.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }
}

module.exports = { UploadController };
