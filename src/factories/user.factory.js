const UserService = require('../services/user.service');
const UserRepository = require('../repositories/user.repository');

function userFactory() {

    const userServiceFactory = () => {
        const userRepository = new UserRepository();
        return new UserService(userRepository);
    }


    return {
        userServiceFactory
    }

}

module.exports = userFactory;