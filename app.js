require("dotenv").config();
const { s3Client } = require("./libs/s3client");
const { makeImageName } = require("./libs/makeName");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const params = {
  Bucket: process.env.AWS_BUCKET,
  Key: makeImageName(32) + ".jpg",
  Body: Buffer.from(process.env.BASE64, "base64"),
  ContentEncoding: "base64",
  ContentType: "image/jpeg"
};


const run = async () => {
  // Create an object and upload it to rhe Amazon S3 bucket.
  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully created " + params.Key + " and uploaded it to " + params.Bucket + "/" + params.Key
    );
  } catch (err) {
    console.log("Error", err);
  }
};

run();
