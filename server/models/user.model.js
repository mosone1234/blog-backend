'use strict'

module.exports = (sequealize, Sequealize) => {
    const user = sequealize.define('user', {
        firstName: {
            type: Sequealize.STRING
        },
        lastName: {
            type: Sequealize.STRING
        },
        userName: {
            type: Sequealize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 100],
                    msg: 'Please enter a username at least 10 chars but no more than 100'
                }
            }
        },
        email: {
            type: Sequealize.STRING,
            unique: {
                args: true,
                msg: 'Email-id required'
            },
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Emails-id required'
                },
                isEmail: {
                    args: true,
                    msg: 'Valid email-id required'
                }
            }
        },
        password: {
            type: Sequealize.STRING,
            allowNul: false,
            validate: {
                len: {
                    args: [4, 200]
                }
            }
        },
        image: {
            type: Sequealize.BLOB
        },
        role: {
            type: Sequealize.ARRAY(Sequealize.STRING)
        },
        gender: {
            type: Sequealize.ENUM('MALE', 'FEMALE')
        },
        status: {
            type: Sequealize.BOOLEAN
        },
        activate_key: {
            type: Sequealize.STRING
        },
        reset_key: {
            type: Sequealize.STRING
        },
    });
    return user;
}