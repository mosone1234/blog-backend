'user strict'

const db = require('../../db');
const User = db.user;
const Article = db.article;

const dataUser = [
    {
        id: 1,
        firstName: 'User',
        lastName: 'User user',
        userName: 'user1234',
        email: 'user@localhost.com',
        password: '12345',
        role: ['USER']
    },
    {
        id: 2,
        firstName: 'Admin',
        lastName: 'Admin Admin',
        userName: 'admin1234',
        email: 'admin@localhost.com',
        password: '12345',
        role: ['ADMIN']
    },
    {
        id: 3,
        firstName: 'System',
        lastName: 'System System',
        userName: 'system1234',
        email: 'system@localhost.com',
        password: '12345',
        role: ['SYSTEM']
    }
];

// Add user

exports.initialDataUser = function () {
    dataUser.forEach(user => {
        User.create(user);
    });
}

const dataArticle = [
    {
        id: 1,
        title: 'El primer articulo de prueba',
        description: 'Este primer articulo es una prueba de integracion de la db',
        userId: 1
    },
    {
        id: 2,
        title: 'El segundo articulo de prueba',
        description: 'Este segundo articulo es una prueba de integracion de la db',
        userId: 2
    },
];

// Add articles

exports.initialDataArticule = function () {
    dataArticle.forEach(article => {
        Article.create(article);
    });
}