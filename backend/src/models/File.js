const mongoose = require('mongoose');

const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        // Everytime File is loaded as Object or JSON, execute the virtual function
        // which adds a filed 'url' to the object
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

File.virtual('url').get(function() {
    const url = process.env.URL || 'http://localhost:3333';

    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);
