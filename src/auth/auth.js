const jwt = require('jsonwebtoken');

function tokenGenerator() {
    // verificar se o usuário existe no banco e retornar um tken valido
    const token = jwt.sign({}, process.env.SECRET, { expiresIn: 300 });
}