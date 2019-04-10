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

        // Trigget a real time response inside the same socketio box
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController();
