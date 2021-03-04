const UserService = require('../services/user.service');
const UserRepository = require('../repositories/user.repository');

function userFactory() {

    const serviceFactory = () => {
        const userRepository = new UserRepository();
        return new UserService(userRepository);
    }


    return {
        serviceFactory
    }

}

module.exports = userFactory;