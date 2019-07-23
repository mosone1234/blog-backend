const role = require('../complements/enums/role');
const auth = require('../services/auth.service');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const mail = require('../complements/configMail/mail');

const db = require('../db');
const User = db.user;

const userCtrl = {};

userCtrl.signup = (req, res) => {
    User.findOne({ where: { email: req.body.email } }).
        then((user) => {
            res.status(400).json({ status: 400, msg: 'The account was created' });
        }).catch(() => {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                const refreshToken = cryptoRandomString({ length: 50, type: 'base64' });
                const new_User = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash,
                    role: [role.ROLE_USER],
                    gender: req.body.gender,
                    activate_key: refreshToken,
                    status: false,
                }
                User.create(new_User).
                    then((user) => {
                        const data = user.dataValues;
                        const url = 'http://localhost:4200/activate-account/';
                        mail.sendMail('/html/activateAccount.html', 'Activar Cuenta', url + data.refreshToken, data);
                        res.status(200).json({ status: 201, msg: 'created' });
                    }).catch((err) => {
                        res.status(500).json({ msg: 'error create user', details: err });
                    });
            });
        });
}

userCtrl.signin = (req, res) => {
    User.findOne({ where: { email: req.body.email } }).
        then((user) => {
            if (!user.dataValues.status) {
                res.status(500).send({ msg: 'Account no activate' });
            } else {
                bcrypt.compare(req.body.password, user.dataValues.password, async (err, result) => {
                    if (await err) {
                        res.status(400).send({ msg: err });
                    }
                    if (await !result) {
                        res.status(400).send({ msg: 'Password incorrect' });
                    } else {
                        // console.log('El resultado --> ', auth.createToken(user.dataValues));
                        auth.createToken(user.dataValues).then((token) => {
                            res.status(200).json({ msg: 'Authenticate successfully', token: token });
                        })
                    }
                });
            }
        }).catch((err) => {
            res.status(500).send({ msg: 'error', details: err + 'Email incorrect' });
        }
        );
}

// userCtrl.signup = (req, res) => {
//     bcrypt.hash(req.body.password, 10, function (err, hash) {
//         const new_User = {
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             userName: req.body.userName,
//             email: req.body.email,
//             password: hash,
//             role: [role.ROLE_USER],
//             gender: req.body.gender,
//             image: req.body.image
//         }
//         User.create(new_User).
//             then((user) => {
//                 res.status(200).json({ token: auth.createToken(user) });
//             }).catch((err) => {
//                 res.status(500).json({ msg: 'error create user', details: err });
//             });
//     });
// }

module.exports = userCtrl;