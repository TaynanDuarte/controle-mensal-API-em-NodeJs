const UserService = require('../../../src/services/user.service');
const UserRepository = require('../../../src/repositories/user.repository');
const UserSchema = require('../../../src/database/schemas/user.schema');

const mongoose = require('mongoose');
const databaseConnection = require('../../../src/database/connection');


describe('UserService', () => {

    beforeAll(async () => {
        databaseConnection.initConnection();
    });

    afterAll(async () => {
        databaseConnection.closeConnection();
    });

    beforeEach(async () => {
        await UserSchema.deleteMany();
    });


    describe('getUser', () => {
        it('should throw a error when email and password is not a string', async () => {

            const userRepository = new UserRepository();
            const userService = new UserService(userRepository);

            const email = 484;
            const password = 7897;

            await expect(userService.getUser(email, password))
                .rejects.toThrow('email and password should be a string');

        });
    });

    describe('updateUser', () => {

        it('should throw a error when user parameter is invalid', () => {

            const userRepository = new UserRepository();
            const userService = new UserService(userRepository);

            const invalidUser = {
                name: 'zé',
                surname: 'test'
            };

            expect(userService.updateUser(invalidUser)).rejects.toThrow('invalid user to update');

        });

    });


    describe('createUser', () => {

        it('should throw an error when user is invalid', async () => {

            const userRepository = new UserRepository();
            const userService = new UserService(userRepository);

            const invalidUser = {
                name: 'zé',
                surname: 'user'
            }

            await expect(userService.createUser(invalidUser))
                .rejects.toThrow('invalid user to create method');

        });

    })

});
