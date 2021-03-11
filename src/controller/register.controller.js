const userFactory = require('../factories/user.factory')();
const dataBaseConnection = require('../database/connection');
const argonHash = require('argon2');


async function createUser(name, email, password) {

    const userService = userFactory.userServiceFactory();

    const newUser = {
        name: name,
        email: email,
        password_hash: await argonHash.hash(password, { type: argonHash.argon2id }),
        role: 'common_user'
    };

    await dataBaseConnection.initConnection();
    const createdUser = await userService.createUser(newUser);
    await dataBaseConnection.closeConnection();

    return createdUser;
}


module.exports = {
    createUser
}
