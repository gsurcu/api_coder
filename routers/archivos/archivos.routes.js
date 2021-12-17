const express = require('express');
const multer = require('multer');
const path = require('path');
const { generarHtmlArchivos} = require('../../utils/app.utils')

const router = express.Router();
// /api/archivos -> /

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{ cb(null, 'public/uploads')},
  filename: (req, file, cb) => { 
    const extension = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
  }
})
const upload = multer({ storage });

router.post('/archivo', upload.single('archivo'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Debes cargar un archivo');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.sendFile(path.resolve(__dirname, `../../public/uploads/${file.filename}`));
})

router.post('/archivos', upload.array('archivos', 5), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error('Debes cargar tus archivos');
    error.httpStatusCode = 400;
    return next(error);
  }
  const html = generarHtmlArchivos(files);
  res.send(html);
})

module.exports = router;