const mongoose = require('mongoose');
const UserSchema = require('../../../src/database/schemas/user.schema');
const UserFactory = require('../../../src/factories/user.factory');
const userUtils = require('../../utils/user.test.utils');


describe('userFactory', () => {

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
                await userUtils.createUserOnMockDataBase('user@test', 'passTest', 'admin');

            const userFactory = new UserFactory()
            const user = await userFactory.getUser(fakeUserCreated.email, fakeUserCreated.password_hash);

            expect(fakeUserCreated._id).toEqual(user._id);
            expect(fakeUserCreated.name).toEqual(user.name);
            expect(fakeUserCreated.email).toEqual(user.email);
            expect(fakeUserCreated.password_hash).toEqual(user.password_hash);


        });
    });


});