const UserService = require('../../../src/services/user.service');
const UserRepository = require('../../../src/repositories/user.repository');
const UserSchema = require('../../../src/database/schemas/user.schema');
const userUtils = require('../../utils/user.test.utils');

const mongoose = require('mongoose');


describe('UserService', () => {

    beforeAll(async () => {
        if (!process.env.MONGO_URL) throw new Error('mongodb was not initalized');
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await UserSchema.deleteMany();
    });


    describe('getUser', () => {
        it('should throw a error when email and passord is not a string', async () => {

            const userRepository = new UserRepository();
            const userService = new UserService(userRepository);

            const email = 154;
            const password = 454;
            expect(() => userService.getUser(email, password))
                .toThrow('email and password should be a string');
        });
    });

    describe('updateUser', () => {

        it('should throw a error when user parameter is invalid', async () => {

            const userRepository = new UserRepository();
            const userService = new UserService(userRepository);

            const invaliUser = {
                name: 'zé',
                surname: 'test'
            };

            expect(() => userService.updateUser(invaliUser)).toThrow('invalid user to update');

        });

    });


});
