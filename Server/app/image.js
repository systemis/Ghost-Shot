module.exports = app => {
    const imgurUploader = require('imgur-uploader');
    const multer = require('multer');
    const path   = require('path');
    const fs     = require('fs');

    var filename;
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, './'));
        },
        filename: (req, file, cb) => {
            filename = './Server/app/' + file.originalname;
            cb(null, file.originalname);
        }
    })

    const uploadImage = multer({storage: storage}).single('image');

    app.post(`/upload/image/imgur`, (req, res) => {
        console.log(req.body);

        uploadImage(req, res, err => {
            if(err) {
                console.log(err);
                return res.send('Upload error !');
            }
            
            imgurUploader(fs.readFileSync(filename), {title: `Image`}).then(data => {
                if(filename) fs.unlink(filename);
                filename = '';
                return res.send(data.link);
            })
        })
    })
}