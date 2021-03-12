const userFactory = require('../factories/user.factory')();
const dataBaseConnection = require('../database/connection');
const hash = require('../utils/hashTools');


async function createUser(name, email, password) {

    const userService = userFactory.userServiceFactory();

    const newUser = {
        name: name,
        email: email,
        password_hash: await hash.getArgonHash(password),
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
