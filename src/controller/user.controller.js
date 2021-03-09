const userFactory = require('../factories/user.factory')();
const dataBaseConnection = require('../database/connection');
const argonHash = require('argon2');


function userController() {

    const userService = userFactory.userServiceFactory();

    async function getUser(email, password) {
        return await userService.getUser(email, password);
    }

    async function createUser(req) {

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password_hash: await argonHash.hash(req.body.password, { type: argonHash.argon2id }),
            role: 'common_user'
        };

        await dataBaseConnection.initConnection();
        const createdUser = await userService.createUser(newUser);
        await dataBaseConnection.closeConnection();

        return createdUser;
    }


    return {
        getUser,
        createUser
    }

}


module.exports = userController;