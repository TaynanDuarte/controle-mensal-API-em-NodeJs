const userFactory = require('../factories/user.factory')();
const dataBaseConnection = require('../database/connection');


function userController() {

    const userService = userFactory.userServiceFactory();

    async function getUser(email, password) {
        return await userService.getUser(email, password);
    }

    async function createUser(req) {

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password_hash: req.body.password,
            role: 'common_user'
        };

        let createdUser = {};
        try {

            await dataBaseConnection.initConnection();
            createdUser = await userService.createUser(newUser);
            await dataBaseConnection.closeConnection();

        } catch (error) {
            console.log('>> error: ', error);
            await dataBaseConnection.closeConnection();
        }

        return createdUser;
    }


    return {
        getUser,
        createUser
    }

}


module.exports = userController;