'user strict'

module.exports = (sequelize, Sequelize) => {
    const image = sequelize.define('image', {
        type: {
            type: Sequelize.STRING(255)
        },
        name: {
            type: Sequelize.STRING(255)
        },
        data: {
            type: Sequelize.STRING(255)
        }
    });
    return image;
}