const User = require('../models/user');
const UserSchema = require('../database/schemas/user.schema');

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

        const { name, email, password_hash, role } = user;

        const newUser = UserSchema({
            name,
            email,
            password_hash,
            role
        });

        const isValid = User.isAValidObject(newUser);
        if (!isValid) throw new Error('invalid user to update');

        return await this.#repository.updateUser(newUser);
    }

    async createUser(user) {

        const { name, email, password_hash, role } = user;

        const newUser = UserSchema({
            name,
            email,
            password_hash,
            role
        });

        const emptyAttr = name === '' || email === '' || password_hash === '' || role === '';
        const isValid = User.isAValidObject(user);

        if (!isValid || emptyAttr) throw new Error('invalid user to create method');

        return await this.#repository.createUser(newUser);
    }

}

module.exports = UserService;