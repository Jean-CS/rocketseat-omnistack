const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
    async store(req, res) {
        const file = await File.create({
            title: req.file.originalname,
            // name of the file, from multer
            path: req.file.key,
        });

        const box = await Box.findById(req.params.id);
        box.files.push(file);
        await box.save();

        return res.json(file);
    }
}

module.exports = new FileController();
