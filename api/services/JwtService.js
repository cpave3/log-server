const jwt = require('jsonwebtoken');
const jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {
    issue: (payload) => {
        token = jwt.sign(payload, jwtSecret, { expiresIn: 180 * 60 });
        return token;
    },

    verify: (token, callback) => {
        return jwt.verify(token, jwtSecret, callback);
    },
};