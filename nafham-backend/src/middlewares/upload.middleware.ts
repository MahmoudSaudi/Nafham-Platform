import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage for multer so we can process the buffer with sharp
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Middleware for a single image upload
export const uploadImage = upload.single('image');

export const processImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.file) {
        return next();
    }

    try {
        // Process image with sharp: convert to webp and resize if necessary
        const processedBuffer = await sharp(req.file.buffer)
            .resize({ width: 800, withoutEnlargement: true }) // Resize to max width 800px
            .webp({ quality: 80 }) // Compress with 80% quality
            .toBuffer();

        // Upload to Cloudinary
        const uploadResult: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'nafham/images', format: 'webp' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            streamifier.createReadStream(processedBuffer).pipe(uploadStream);
        });

        // Attach the public URL to req.body so the controller can use it
        req.body.imageUrl = uploadResult.secure_url;
        
        next();
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ success: false, message: 'Error processing image' });
    }
};
