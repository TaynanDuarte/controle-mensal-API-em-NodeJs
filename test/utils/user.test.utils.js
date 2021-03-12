const UserSchema = require('../../src/database/schemas/user.schema');
const hash = require('../../src/utils/hashTools');

async function createUserOnMockDataBase(name = '', email = '', password = '', role = '') {
    if (!process.env.MONGO_URL) throw new Error('Mock database was not initialized');
    

    const userCreated = new UserSchema({
        name: name,
        email: email,
        password_hash: await hash.getArgonHash(password),
        role: role
    });

    return await userCreated.save();
}

module.exports = {
    createUserOnMockDataBase
};
