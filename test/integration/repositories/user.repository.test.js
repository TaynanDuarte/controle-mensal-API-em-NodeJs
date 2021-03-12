const databaseConnection = require('../../../src/database/connection');
const UserSchema = require('../../../src/database/schemas/user.schema');
const UserRepository = require('../../../src/repositories/user.repository');
const userUtils = require('../../utils/user.test.utils');
const User = require('../../../src/models/user');


describe('userRepository', () => {

    beforeAll(async () => {
        await databaseConnection.initConnection();
    });

    afterAll(async () => {
        await databaseConnection.closeConnection();
    });

    beforeEach(async () => {
        await UserSchema.deleteMany();
    });


    describe('getUser', () => {
        it('should receive email and user password, then returns an user', async () => {

            const fakeUserCreated =
                await userUtils.createUserOnMockDataBase('ZéTest1', 'user@test1', 'passTest1', 'admin1');

            const userRepository = new UserRepository();
            const user = await userRepository.getUser('user@test1', 'passTest1');

            expect(fakeUserCreated._id).toEqual(user._id);
            expect(fakeUserCreated.name).toEqual(user.name);
            expect(fakeUserCreated.email).toEqual(user.email);
            expect(fakeUserCreated.role).toEqual(user.role);
            expect(fakeUserCreated.password_hash).toEqual(user.password_hash);

        });

        it('should return null when email was not found', async () => {

            const fakeUserCreated =
                await userUtils.createUserOnMockDataBase('ZéTest', 'user@test', 'passTest', 'admin');

            const userRepository = new UserRepository();
            const user = await userRepository.getUser('user2@Test', 'passTest');

            await expect(user).toBe(null);

        });

        it('should return null when password hash doesnt match', async () => {

            const fakeUserCreated =
                await userUtils.createUserOnMockDataBase('ZéTest', 'user@test', 'passTest', 'admin');

            const userRepository = new UserRepository();
            const user = await userRepository.getUser(fakeUserCreated.email, '123');

            await expect(user).toBe(null);

        });

    });


    describe('updateUser', () => {
        it('should receive a user and update it on database', async () => {
            const fakeUserCreated =
                await userUtils.createUserOnMockDataBase('ZéTest', 'user1@test', 'passTest', 'admin');

            const userRepository = new UserRepository();
            const newUserInfo = { ...fakeUserCreated._doc, name: 'UserTest' };
            const updateResponse = await userRepository.updateUser(newUserInfo);
            expect(updateResponse.nModified).toBe(1);

        });
    });


    describe('createUser', () => {

        it('should recive a user and insert it on database', async () => {

            const user = new User('1', 'zeTest', 'user@test', '1234', 'admin').getJsonFormat();

            const userRepository = new UserRepository();
            const newUser = await userRepository.createUser(user);

            expect(newUser.name).toBe('zeTest');
            expect(newUser.email).toBe('user@test');
            expect(newUser.password_hash).toBe('1234');
            expect(newUser.role).toBe('admin');

        });

    });

});