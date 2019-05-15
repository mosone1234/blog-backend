const role = require('../complements/enums/role');
const auth = require('../services/auth.service');
const bcrypt = require('bcrypt');

const db = require('../db');
const User = db.user;

const userCtrl = {};

userCtrl.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const new_User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            role: [role.ROLE_USER],
            gender: req.body.gender,
            image: req.body.image
        }
        User.create(new_User).
            then((user) => {
                res.status(200).json({ token: auth.createToken(user) });
            }).catch((err) => {
                res.status(500).json({ msg: 'error create user', details: err });
            });
    });
}

userCtrl.signin = (req, res) => {
    User.findOne({ where: { email: req.body.email } }).
        then((user) => {
            bcrypt.compare(req.body.password, user.password, async (err, result) => {
                if (await err) {
                    res.status(400).send({ msg: err });
                }
                if (await !result) {
                    res.status(400).send({ msg: 'Password incorrect' });
                } else {
                    res.status(200).json({ msg: 'Authenticate successfully', token: auth.createToken(user) });
                }
            });
        }).catch((err) => {
            res.status(500).send({ msg: 'error', details: err + 'Email incorrect' });
        }
        );
}

module.exports = userCtrl;