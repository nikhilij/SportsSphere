const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

// File filter function
const fileFilter = (req, file, cb) => {
    // Check file type
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and documents are allowed.'));
    }
};

// Configure multer for S3 upload
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            const fileName = `${uuidv4()}${fileExtension}`;
            const folder = file.fieldname === 'profilePicture' ? 'profiles' : 'uploads';
            cb(null, `${folder}/${fileName}`);
        }
    }),
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Single file upload middleware
const uploadSingle = (fieldName) => {
    return upload.single(fieldName);
};

// Multiple files upload middleware
const uploadMultiple = (fieldName, maxCount = 5) => {
    return upload.array(fieldName, maxCount);
};

// Delete file from S3
const deleteFile = async (fileKey) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey
        };
        
        await s3.deleteObject(params).promise();
        return true;
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        return false;
    }
};

// Get signed URL for private files
const getSignedUrl = (fileKey, expiresIn = 3600) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
        Expires: expiresIn
    };
    
    return s3.getSignedUrl('getObject', params);
};

// Upload buffer to S3
const uploadBuffer = async (buffer, fileName, contentType) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: contentType,
            ACL: 'public-read'
        };
        
        const result = await s3.upload(params).promise();
        return result.Location;
    } catch (error) {
        console.error('Error uploading buffer to S3:', error);
        throw error;
    }
};

module.exports = {
    uploadSingle,
    uploadMultiple,
    deleteFile,
    getSignedUrl,
    uploadBuffer,
    s3
};