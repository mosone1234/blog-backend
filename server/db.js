const pg = require('pg');

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'blog',
    password: 'postgres',
    port: 5432,
});
client.connect()
    .then(db => console.log('DB pg is connect'))
    .catch(err => console.error(err));

const env = {
    database: 'blog',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// create db
db.user = require('../server/models/user.model')(sequelize, Sequelize);
db.article = require('../server/models/article.model')(sequelize, Sequelize);

// relationShip between tables
db.user.hasMany(db.article, { constraints: false } );
db.article.belongsTo(db.user, { constraints: false } );

module.exports = db;