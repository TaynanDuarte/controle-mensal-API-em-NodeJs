const timeTools = require('../../../src/utils/time_tools');

describe('time_tools test', () => {

    describe('secondsToMinuts', () => {

        it('should recive seconds and retun minuts', () => {

            const seconds = 300;
            const minuts = timeTools.secondsToMinuts(seconds);
            expect(minuts).toBe(5);

        });

        it('should throw a error when parameter is not a integer', () => {
            const seconds = "5";
            expect(() => timeTools.secondsToMinuts(seconds)).toThrow('seconds parameter should be a integer');
        });

    });

    describe('minutsToSeconds', () => {

        it('should recive minuts and retun seconds', () => {

            const minuts = 300;
            const seconds = timeTools.secondsToMinuts(minuts);
            expect(seconds).toBe(5);

        });

        it('should throw a error when parameter is not a integer', () => {

            const minuts = "5";
            expect(() => timeTools.minutsToSeconds(minuts)).toThrow('minuts parameter should be a integer');

        });

    });


});