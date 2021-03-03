const timeTools = require('../../../src/utils/time_tools');

describe('time_tools test', () => {

    describe('minutsToSeconds', () => {

        it('should recive minuts and retun seconds', () => {

            const minuts = 5;
            const seconds = timeTools.minutsToSeconds(minuts);
            expect(seconds).toBe(300);

        });

        it('should throw a error when parameter is not a integer', () => {

            const minuts = "5";
            expect(() => timeTools.minutsToSeconds(minuts)).toThrow('minuts parameter should be a integer');

        });

    });


});