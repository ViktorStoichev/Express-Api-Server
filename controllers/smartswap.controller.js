import axios from 'axios';
import multer from 'multer';

const upload = multer();

export const uploadImage = [
    upload.single('image'),
    async (req, res) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'No image file provided' });
            }

            const imageBase64 = file.buffer.toString('base64');

            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
                {
                    image: imageBase64,
                }
            );

            res.status(200).json({
                url: response.data.data.url,
                deleteUrl: response.data.data.delete_url,
            });

        } catch (error) {
            console.error('Upload failed:', error.message);
            res.status(500).json({ message: 'Image upload failed' });
        }
    }
];

export const deleteImage = async (req, res) => {
    try {
        const { deleteUrl } = req.body;

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
