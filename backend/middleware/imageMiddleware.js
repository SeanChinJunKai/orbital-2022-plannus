const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './frontend/public/profileImages');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname.replace(/\s+/g, '-').toLowerCase());
    }
})

const fileFilter = (req, file, callback) => {
    const allowedFileTypes = ['image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false)
    }
}

const upload = multer({storage, fileFilter })

module.exports = {upload};