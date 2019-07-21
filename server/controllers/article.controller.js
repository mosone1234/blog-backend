'use strict'

const db = require('../db');
const Article = db.article;

exports.findAll = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
    Article.findAndCountAll({ offset, limit, order: [[value, type]] }).then(articles => {
        const pages = Math.ceil(articles.count / limit);
        const elements = articles.count;
        res.json({
            elements,
            page,
            pageSize,
            pages,
            articles,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

exports.create = (req, res) => {
    Article.create(req.body).
        then((article) => {
            res.json(article);
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
        then((article) => {
            res.json(article);
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
