// middleware.js

const multer = require('multer');
const bodyParser = require('body-parser');

function handleFormData(req, res, next) {
    const upload = multer().fields([{ name: 'profilePicture', maxCount: 1 }]);
    upload(req, res, function (err) {
        if (err) {
            return next(err);
        }
        if (req.files && req.files.profilePicture) {
            const profilePicture = req.files.profilePicture[0];
            req.body.imageBuffer = profilePicture.buffer;
            req.body.imageType = profilePicture.mimetype;
        }
        next();
    });
}

module.exports = handleFormData;
