const mongoose = require('mongoose');
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
        it('should receive email and user password, then returns an user if it was finded', async () => {

            const fakeUserCreated =
                await userUtils.createUserOnMockDataBase('ZéTest', 'user@test', 'passTest', 'admin');

            const userRepository = new UserRepository();
            const user = await userRepository.getUser(fakeUserCreated.email, fakeUserCreated.password_hash);

            expect(fakeUserCreated._id).toEqual(user._id);
            expect(fakeUserCreated.name).toEqual(user.name);
            expect(fakeUserCreated.email).toEqual(user.email);
            expect(fakeUserCreated.role).toEqual(user.role);
            expect(fakeUserCreated.password_hash).toEqual(user.password_hash);

        });

        it('should return empty json em user is not finded', async () => {

            const fakeUserCreated =
                await userUtils.createUserOnMockDataBase('ZéTest', 'user@test', 'passTest', 'admin');

            const userRepository = new UserRepository();
            const user = await userRepository.getUser('userTest', '123');

            await expect(user).toBe(null);

        });

    });


    describe('updateUser', () => {
        it('should receive a user and update it on database', async () => {
            const fakeUserCreated =
                await userUtils.createUserOnMockDataBase('ZéTest', 'user@test', 'passTest', 'admin');

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