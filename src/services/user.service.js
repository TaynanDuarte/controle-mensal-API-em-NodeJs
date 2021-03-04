const User = require('../models/user');

class UserService {

    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async getUser(email, password) {

        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('email and password should be a string');
        }

        const user = await this.#repository.getUser(email, password); 
        return user;
    }

    async updateUser(user) {

        const isValid = User.isAValidObject(user);
        if (!isValid) throw new Error('invalid user to update');

        return await this.#repository.updateUser(user);
    }

}

module.exports = UserService;