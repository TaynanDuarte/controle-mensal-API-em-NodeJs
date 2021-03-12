const supertest = require('supertest');
const app = require('../../../src/app');
const databaseConnection = require('../../../src/database/connection');
const testUtils = require('../../utils/user.test.utils');
const authTools = require('../../../src/auth/auth.tools');
const UserSchema = require('../../../src/database/schemas/user.schema');


describe('POST /login', () => {

    beforeAll(async () => {
        await databaseConnection.initConnection();
    });

    afterAll(async () => {
        await databaseConnection.closeConnection();
    });

    beforeEach(async () => {
        await UserSchema.deleteMany();
    });


    it('should recieve a json with email and password and authenticate the user with JWT', async () => {
        const createdUser =
            await testUtils.createUserOnMockDataBase('userTest', 'user@logintest', '321', 'admin');

        const res = await supertest(app)
            .post('/login')
            .send({
                email: 'user@logintest',
                password: '321'
            });


        expect(res.body).toEqual({
            token: authTools.generateTokenWithEmail(createdUser.email),
            data: {
                email: 'user@logintest'
            }
        });
    });


    it('should recieve a json with email and password, and return status code 401 if user is not found',
        async () => {

            const userCreated =
                await testUtils.createUserOnMockDataBase('userTest', 'user@logintest', '321', 'admin');

            const res = await supertest(app)
                .post('/login')
                .send({
                    email: 'user@test',
                    password: '321'
                });

            expect(res.status).toBe(401);
            expect(res.text).toBe('authentication failed');

        });


    it('should return status 400 when request do not contains email or password', async () => {

        const res = await supertest(app)
            .post('/login')
            .send({
                name: 'userTeste',
            });

        expect(res.status).toBe(400);
        expect(res.text).toBe('invalid request');

    });

});
