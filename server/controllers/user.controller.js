const db = require('../db');
const User = db.user;

exports.findAll = (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

exports.create = (req, res) => {
    User.create(req.body).
        then((user) => {
            res.json(user);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ msg: 'error', details: err })
        });
}

exports.update = (req, res) => {
    const id = res.body.id
    User.update(req.body, { where: { id: id } }).
        then(() => {
            res.status(200).json({ msg: 'update successfully -> id = ' + id });
        }).catch((err) => {
            res.status(500).json({ msg: 'error', details: err });
        });
}

exports.findById = (req, res) => {
    const id = req.params.id;
    User.findById(id).
        then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    User.delete({ where: { id: id } }).
        then(() => {
            res.status(200).json({ msg: 'deleted successfully -> curstomer id = ', id });
        }).catch((err) => {
            res.status(300).json({ msg: 'error', details: err });
        });
}

// exports.authenticate = (req, res, next) => {
//     userService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }