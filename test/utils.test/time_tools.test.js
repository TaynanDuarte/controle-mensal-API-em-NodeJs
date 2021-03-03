const timeTools = require('../../src/utils/time_tools');

describe('time_tools test', () => {

    it('should recive seconds and retun minuts', () => {

        const seconds = 300;
        const minuts = timeTools.secondsToMinuts(seconds);
        expect(minuts).toBe(5);

    });

});