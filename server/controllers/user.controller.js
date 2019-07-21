'use strict'

const db = require('../db');
const User = db.user;
const mail = require('../complements/configMail/mail');
const cryptoRandomString = require('crypto-random-string');
// const fs = require('fs');

const userCtrl = {};

userCtrl.findAll = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = page * pageSize;
    const limit = offset + pageSize;
    const value = req.query.sort ? req.query.sort : 'id';
    const type = req.query.type ? req.query.type.toUpperCase() : 'ASC';
    User.findAndCountAll({ offset, limit, order: [[value, type]] }).
        then(users => {
            const pages = Math.ceil(users.count / limit);
            const elements = users.count;
            res.status(200).json(
                {
                    elements,
                    page,
                    pageSize,
                    pages,
                    users,
                }
            );
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

// userCtrl.createUser = (req, res) => {
//     User.create(req.body)
// }

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

userCtrl.resetPasswordInit = (req, res) => {
    const email = req.body.email;
    // console.log('---------__:???????????????????????>>>>>>>>>>>>>>>> ', __dirname);
    const refreshToken = cryptoRandomString({ length: 50, type: 'base64' });
    User.findOne({ where: { email: email } }).then((user) => {
        mail.sendMail('El token de referencia', refreshToken, user);
        res.status(200).json({ key: "Esta es la llave que se mandara" });
        const data = user.dataValues;
        data.reset_key = refreshToken;
        User.update(data, { where: { id: user.id } }).then(() => {
            console.log('lA ACTUALIZCIOND E LOS DATOS ');
        });
    }).catch((err) => {
        res.status(500).json({ msg: 'error', details: err });
    });
}

userCtrl.resetPasswordFinish = (req, res) => {
    const key = req.body.key;
    console.log('El tipo es --> ', key);
    try {
        res.status(200).json({ key: "Esta es la llave que se mandara" });
    } catch (err) {
        res.status(500).json({ msg: 'error', details: err });
    }
}

module.exports = userCtrl;
