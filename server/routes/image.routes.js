'user strict'

const express = require('express');
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + new Date().toISOString())
    }
})

const upload = multer({ storage: storage })

const router = express.Router();

const imageCtrl =  require('../controllers/image.controller');

router.get('/api/images', imageCtrl.findAll);
router.delete('/api/images', imageCtrl.delete);
router.post('/api/images', upload.single('imageUpload'), imageCtrl.uploadImage);

module.exports = router;