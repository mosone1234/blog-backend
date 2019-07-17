'use strict'

const multer = require('multer');
const db = require('../db');
const Image = db.image;
const upload = multer({ dest: 'uploads/' })
const imageCtrl = {};

imageCtrl.findAll = (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const pageSize = req.query.pageSize ? req.query.pageSize : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    Image.findAndCountAll({ offset, limit }).then(
        (images) => {
            const pages = Math.ceil(images.count / limit);
            const elements = images.count;
            res.status(200).json(
                elements,
                page,
                pageSize,
                pages,
                images,
            );
        }).catch(
            (err) => {
                res.status(500).json({ msg: 'error', detail: err });
            }
        )
}

imageCtrl.delete = (req, res) => {
    const id = req.params.id;
    Image.destroy({ where: { id: id } }).
        then((res) => {
            res.status(200).json({ msg: 'deleted successfully -> curstomer id = ', id });
        }).catch(
            (error) => {
                res.status(500).json({ msg: 'error', detail: error });
            }
        )
}

imageCtrl.uploadImage = (req, res) => {
    Image.create({
        type: req.body.type,
        name: req.body.name,
        data: req.file.path
    }).then(
        (res) => {
            res.status(200).json(res);
        }
    ).catch(
        (err) => {
            res.status(500).json({ msg: 'error', details: err });
        }
    )
};

// imageCtrl.getIMage = (req, file, res) => {

// }

module.exports = imageCtrl;