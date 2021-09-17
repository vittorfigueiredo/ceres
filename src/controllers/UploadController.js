const { s3Client } = require("../database/S3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { makeFileName } = require("../functions/MakeFileName");

class UploadController {
  async send(request, response) {
    const { base64 } = request.body;

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: makeFileName(32) + ".jpg",
      Body: Buffer.from(base64, "base64"),
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    // Create an object and upload it to rhe Amazon S3 bucket.
    try {
      const results = await s3Client.send(new PutObjectCommand(params));

      return response.json({
        success: true,
        URL: "https://vitorfigueiredo.s3.us-east-2.amazonaws.com/" + params.Key,
        output: s3Client.GetObjectOutput,
      });
    } catch (err) {
      console.log("Error", err);
    }
  }
}

module.exports = { UploadController };
