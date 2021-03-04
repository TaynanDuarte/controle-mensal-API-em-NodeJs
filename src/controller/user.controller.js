

const userFactory = require('../factories/user.factory')();

function userController() {

    const userService = userFactory.userServiceFactory()

    async function getUser(email, password) {
        return await userService.getUser(email, password);
    }

}


module.exports = userController;