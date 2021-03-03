const UserSchema = require('../../src/database/schemas/user.schema');

async function createUserOnMockDataBase(name = '', email = '', password_hash = '', role = '') {
    if (!process.env.MONGO_URL) throw new Error('Mock database was not initialized');

    const userCreated = new UserSchema({
        name: name,
        email: email,
        password_hash: password_hash,
        role: role
    });

    return await userCreated.save();
}

module.exports = {
    createUserOnMockDataBase
};
