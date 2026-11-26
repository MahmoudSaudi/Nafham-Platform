import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { uploadImage, processImage } from '../middlewares/upload.middleware';

const router = Router();

// Use memory storage for general files as well
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

router.post('/', upload.single('file'), async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload to Cloudinary directly from memory buffer
    const uploadResult: any = await new Promise((resolve, reject) => {
      // For raw files like PDF, we might need to specify resource_type 'raw' or 'auto'
      const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'nafham/files', resource_type: 'auto' },
          (error, result) => {
              if (error) return reject(error);
              resolve(result);
          }
      );
      streamifier.createReadStream(req.file!.buffer).pipe(uploadStream);
    });

    return res.status(200).json({
      success: true,
      url: uploadResult.secure_url,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: 'Server error during upload' });
  }
});

// Endpoint for optimized image uploads (WebP format)
router.post('/image', uploadImage, processImage, (req: Request, res: Response): any => {
    try {
        if (!req.body.imageUrl) {
            return res.status(400).json({ success: false, message: 'Image upload failed' });
        }
        
        return res.status(200).json({
            success: true,
            url: req.body.imageUrl,
            message: 'Image uploaded and processed successfully'
        });
    } catch (error) {
        console.error('Image upload route error:', error);
        return res.status(500).json({ success: false, message: 'Server error during image upload' });
    }
});

export default router;
