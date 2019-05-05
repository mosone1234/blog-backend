'use strict'

module.exports = (sequealize, Sequealize) => {
    const user = sequealize.define('user', {
        firstName: {
            type: Sequealize.STRING(255)
        },
        lastName: {
            type: Sequealize.STRING(255)
        },
        username: {
            type: Sequealize.STRING(255),
            unique: true
        },
        email: {
            type: Sequealize.STRING(255),
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequealize.STRING(255)
        },
        role: Sequealize.ARRAY(Sequealize.TEXT)
    });
    return user;
}