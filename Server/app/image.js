module.exports = app => {
    const multer = require('multer');
    const path   = require('path');

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, './'));
        },
        filename: (req, file, cb) => {
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
            
            res.send('Upload success !');
        })
    })
}