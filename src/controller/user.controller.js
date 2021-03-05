

const userFactory = require('../factories/user.factory')();

function userController() {

    const userService = userFactory.userServiceFactory();

    async function getUser(email, password) {
        return await userService.getUser(email, password);
    }

    async function createUser(user) {
        return await userService.createUser(user);
    }


    return {
        getUser,
        createUser
    }

}


module.exports = userController;