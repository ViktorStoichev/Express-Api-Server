import axios from 'axios';
import multer from 'multer';
import sharp from 'sharp';

const upload = multer();

export const uploadImage = [
    upload.single('image'),
    async (req, res) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'No image file provided' });
            }

            // 🔧 Смалява изображението до ширина 1024px, компресира в JPEG с 80% качество
            const resizedBuffer = await sharp(file.buffer)
                .resize({ width: 1024, withoutEnlargement: true }) // няма да увеличава ако е по-малко
                .jpeg({ quality: 80 }) // компресира с 80% качество
                .toBuffer();

            const imageBase64 = resizedBuffer.toString('base64');

            const params = new URLSearchParams();
            params.append('key', process.env.IMGBB_API_KEY);
            params.append('image', imageBase64);

            const response = await axios.post(
                'https://api.imgbb.com/1/upload',
                params.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            res.status(200).json({
                url: response.data.data.url,
                deleteUrl: response.data.data.delete_url,
            });

        } catch (error) {
            console.error('Upload failed:', error.response?.data || error.message);
            res.status(500).json({ message: 'Image upload failed' });
        }
    }
];

export const deleteImage = async (req, res) => {
    try {
        const deleteUrl = req.query.deleteUrl;

        if (!deleteUrl) {
            return res.status(400).json({ message: 'Delete URL is required' });
        }

        const response = await axios.get(deleteUrl);
        res.status(200).json({ message: 'Image deleted successfully', data: response.data });
    } catch (error) {
        console.error('Delete failed:', error.message);
        res.status(500).json({ message: 'Image deletion failed' });
    }
};
