const User = require('../models/user');

class UserService {

    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async getUser(email, password) {

        if (typeof email !== 'String' || typeof password !== 'String') {
            throw new Error('email and password should be a string');
        }

        return this.#repository.getUser(email, password);
    }

    async updateUser(user) {

        const isValid = User.isAValidObject(user);
        if (!isValid) throw new Error('invalid user to update');

        await this.#repository.updateUser(user);
    }

}

module.exports = UserService;