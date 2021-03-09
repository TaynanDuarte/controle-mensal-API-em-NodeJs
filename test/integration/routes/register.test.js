const supertest = require('supertest');
const app = require('../../../src/app');
const databaseConnection = require('../../../src/database/connection');


describe('POST /register', () => {

    beforeAll(async () => {
        await databaseConnection.initConnection();
    });

    afterAll(async () => {
        await databaseConnection.closeConnection();
    });


    it('should recieve a user, insert it on database then return status 201', async () => {
        const res = await supertest(app)
            .post('/register')
            .send({
                name: 'userTest',
                email: 'user@test',
                password: '123'
            });

        expect(res.status).toBe(201);
        expect(res.text).toBe('user created');
    });


    it('should return status 400 when recieve a invalid user object', async () => {

        const res = await supertest(app)
            .post('/register')
            .send({
                name: 'user',
                surname: 'Test'
            });

        expect(res.status).toBe(400);

    });

});