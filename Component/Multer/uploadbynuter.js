const cloudinary = require('./cloudinary');
const streamifier = require('streamifier');

exports.multerupload = async (req, res) => {

    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: 'No file or invalid file buffer' });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'uploads' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        res.status(200).json({ url: result.secure_url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

function getPublicIdFromUrl(url) {
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.\w+$/;
    const match = url.match(regex);
    if (!match) throw new Error('Invalid Cloudinary URL format');
    return match[1]; // e.g. "folder/image"
}

exports.deletemulter = async (req, res) => {

    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        const publicId = getPublicIdFromUrl(imageUrl);

        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            if (result.result === 'not found') {
                return res.status(404).json({ message: 'Image not found on Cloudinary' });
            }
            res.json({ message: 'Image deleted successfully', result });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


