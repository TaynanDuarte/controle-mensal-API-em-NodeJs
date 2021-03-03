const jwt = require('jsonwebtoken');

function tokenGenerator() {
    const token = jwt.sign({}, process.env.SECRET, {expiresIn: 300});
}