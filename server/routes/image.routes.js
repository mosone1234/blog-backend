'user strict'

const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../services/auth.service');
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage })

const imageCtrl = require('../controllers/image.controller');

router.get('/api/images', imageCtrl.findAll);
router.delete('/api/images', auth.verifyToken, imageCtrl.delete);
router.post('/api/images', auth.verifyToken, upload.single('imageUpload'), imageCtrl.uploadImage);

module.exports = router;