import multer from 'multer';
import sharp from 'sharp';
import cloudinary from '../utils/cloudinary.js';

const upload = multer();

export const uploadImage = [
    upload.single('image'),
    async (req, res) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'No image file provided' });
            }

            const resizedBuffer = await sharp(file.buffer)
                .resize({ width: 1024, withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toBuffer();

            // Upload to Cloudinary using stream
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload failed:', error);
                        return res.status(500).json({ message: 'Image upload failed' });
                    }
                    res.status(200).json({
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                }
            );
            stream.end(resizedBuffer);
        } catch (error) {
            console.error('Upload failed:', error.message);
            res.status(500).json({ message: 'Image upload failed' });
        }
    }
];

export const deleteImage = async (req, res) => {
    try {
        const publicId = req.query.public_id;

        if (!publicId) {
            return res.status(400).json({ message: 'public_id is required' });
        }

        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok') {
            res.status(200).json({ message: 'Image deleted successfully' });
        } else {
            res.status(400).json({ message: 'Image deletion failed', data: result });
        }
    } catch (error) {
        console.error('Delete failed:', error.message);
        res.status(500).json({ message: 'Image deletion failed' });
    }
};
