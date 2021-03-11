const jwt = require('jsonwebtoken');


function generateTokenWithEmail(email) {
    return jwt.sign(email, process.env.SECRET);
}

module.exports = {
    generateTokenWithEmail
}