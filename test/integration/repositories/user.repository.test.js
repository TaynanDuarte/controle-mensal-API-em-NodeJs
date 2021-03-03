const mongoose = require('mongoose');
const UserSchema = require('../../../src/database/schemas/user.schema');
const UserRepository = require('../../../src/repositories/user.repository');
const userUtils = require('../../utils/user.test.utils');


describe('userRepository', () => {

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
        it('should recive email and user password, then returns an user if it was finded', async () => {

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
    });


    describe('updateUser', () => {
        it('should recive a user and update it on database', async () => {
            const fakeUserCreated =
                await userUtils.createUserOnMockDataBase('ZéTest', 'user@test', 'passTest', 'admin');

            const userRepository = new UserRepository();
            const newUserInfo = { ...fakeUserCreated._doc, name: 'UserTest' };
            const updateResponse = await userRepository.updateUser(newUserInfo);
            expect(updateResponse.nModified).toBe(1);

        });
    });

});