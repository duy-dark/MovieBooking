const express = require('express');
const router = express.Router();
const handler = require('./handler');
let multer = require('multer');

let diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    let math = ['image/png', 'image/jpeg'];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    let filename = `${file.originalname}`;
    callback(null, filename);
  }
});

let uploadFile = multer({storage: diskStorage}).single('file');

router.post('/upload', (req, res, next) => {
  uploadFile(req, res, (error) => {
    if (error) {
      return res.send(`Error when trying to upload: ${error}`);
    }
    if (req.file) {
      let filename = req.file.filename;
      handler
        .postCreate(filename)
        .then((val) => res.json(val))
        .catch((err) => next(err));
    } else {
      res.status(204).json({
        status: 'error',
        data: {
          error_message: {
            message: "không có file"
          }
        }
      })
    }
  });
});

module.exports = router;
