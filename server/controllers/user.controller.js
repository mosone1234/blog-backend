'use strict'

const db = require('../db');
const User = db.user;


const userCtrl = {};


userCtrl.findAll = (req, res) => {
    User.findAll().
        then(users => {
            res.status(200).json(users);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
};

userCtrl.create = (req, res) => {
    User.create(req.body).
        then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(500).json({ msg: 'error', details: err });
        });
}

userCtrl.update = (req, res) => {
    const id = req.body.id;
    User.update(req.body, { where: { id: id } }).
        then(() => {
            res.status(200).json(req.body);
        }).catch((err) => {
            res.status(500).json({ msg: 'error', details: err });
        });
}

userCtrl.findById = (req, res) => {
    const id = req.params.id;
    User.findOne({ where: { id: id } }).
        then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

userCtrl.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({ where: { id: id } }).
        then(() => {
            res.status(200).json({ msg: 'deleted successfully -> curstomer id = ', id });
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

module.exports = userCtrl;
