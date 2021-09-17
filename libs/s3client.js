const { S3Client } = require("@aws-sdk/client-s3");

const region = "us-east-2";
const s3Client = new S3Client({ region });

module.exports = { s3Client };
