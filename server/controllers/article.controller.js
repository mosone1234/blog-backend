'use strict'

const db = require('../db');
const Article = db.article;

exports.findAll = (req, res) => {
    Article.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

exports.create = (req, res) => {
    Article.create(req.body).
        then((user) => {
            res.json(user);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ msg: 'error', details: err })
        });
}

exports.update = (req, res) => {
    const id = res.body.id
    Article.update(req.body, { where: { id: id } }).
        then(() => {
            res.status(200).json({ msg: 'update successfully -> id = ' + id });
        }).catch((err) => {
            res.status(500).json({ msg: 'error', details: err });
        });
}

exports.findById = (req, res) => {
    const id = req.params.id;
    Article.findById(id).
        then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Article.delete({ where: { id: id } }).
        then(() => {
            res.status(200).json({ msg: 'deleted successfully -> curstomer id = ', id });
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}
