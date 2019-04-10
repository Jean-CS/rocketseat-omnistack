const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const fileFolder = 'temp';

module.exports = {
    // destination
    dest: path.resolve(__dirname, '..', '..', fileFolder),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', fileFolder));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        },
    }),
};
