const hash = require('../../../src/utils/hashTools');

describe('hashTools', () => {

    it('should recieve a hash and password and return true if it matches', async () => {

        const passwordTest = '123';
        const passwordTestHash = await hash.getArgonHash(passwordTest);

        const match = await hash.verifyPassword(passwordTestHash, passwordTest);

        expect(match).toBe(true);

    });

    it('should recieve a hash and password and return false if doesnt match', async () => {

        const passwordTest = '123';
        const passwordTestHash = await hash.getArgonHash(passwordTest);

        const wrongPassword = '789';

        const match = await hash.verifyPassword(passwordTestHash, wrongPassword);

        expect(match).toBe(false);

    });


});