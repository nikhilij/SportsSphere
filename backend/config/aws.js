const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const logger = require("../utils/logger");

dotenv.config();

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || "us-east-1",
});

// Create an S3 instance
const s3 = new AWS.S3();

// Test S3 access
async function testS3Connection() {
  try {
    await s3.listBuckets().promise();
    logger.info("AWS S3 connection successful");
    return true;
  } catch (error) {
    logger.error("AWS S3 connection failed:", error);
    return false;
  }
}

// S3 bucket operations
const S3Operations = {
  // Upload a file to S3
  uploadFile: async (file, key, bucket = process.env.AWS_S3_BUCKET) => {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    try {
      const result = await s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      logger.error("Error uploading file to S3:", error);
      throw error;
    }
  },

  // Delete a file from S3
  deleteFile: async (key, bucket = process.env.AWS_S3_BUCKET) => {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    try {
      await s3.deleteObject(params).promise();
      return true;
    } catch (error) {
      logger.error("Error deleting file from S3:", error);
      throw error;
    }
  },

  // Get a file from S3
  getFile: async (key, bucket = process.env.AWS_S3_BUCKET) => {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    try {
      const data = await s3.getObject(params).promise();
      return data;
    } catch (error) {
      logger.error("Error getting file from S3:", error);
      throw error;
    }
  },

  // Generate a presigned URL for file download
  getSignedUrl: (key, bucket = process.env.AWS_S3_BUCKET, expires = 3600) => {
    const params = {
      Bucket: bucket,
      Key: key,
      Expires: expires,
    };

    try {
      return s3.getSignedUrl("getObject", params);
    } catch (error) {
      logger.error("Error generating signed URL:", error);
      throw error;
    }
  },
};

module.exports = {
  s3,
  S3Operations,
  testS3Connection,
};
