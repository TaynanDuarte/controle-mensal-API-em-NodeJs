const argonHash = require('argon2');

async function getArgonHash(text) {
    return await argonHash.hash(text, { type: argonHash.argon2id });
}

async function verifyPassword(hash, password) {
    return await argonHash.verify(hash, password);
}

module.exports = {
    getArgonHash,
    verifyPassword
}