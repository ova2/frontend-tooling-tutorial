import {mock} from './mock';

describe('src/mock', () => {
    it('mocked function should be silent', () => {
        function passthru(...args: any[]): any[] {
            return args;
        }

        let mockedFn = mock(passthru);

        // verify return value of real function
        expect(passthru(1, 2)).toEqual([1, 2]);
        // verify return value of mocked function
        expect(mockedFn(1, 2)).toBeUndefined();
    });
});
