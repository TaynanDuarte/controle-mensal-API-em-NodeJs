const UserService = require('../../../src/services/user.service');
const UserRepository = require('../../../src/repositories/user.repository');
const UserSchema = require('../../../src/database/schemas/user.schema');

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

});
