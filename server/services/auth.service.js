
const jwt = require('jwt-simple');
const moment = require('moment');
const secrect_token = 'validate_token_access_application';

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'day').unix(),
    }
    return jwt.encode(payload, secrect_token);
}

module.exports = {
    createToken,
};
