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

    it('mocked function should return defined return value', () => {
        function sum(a: number, b: number): number {
            return a + b;
        }

        let mockedFn = mock(sum);
        mockedFn.returns(10);

        // verify return value of real function
        expect(sum(1, 2)).toEqual(3);
        // verify return value of mocked function
        expect(mockedFn(1, 2)).toEqual(10);
    });

    it('mocked function should throw error', () => {
        function greeting(): string {
            return 'Hello World';
        }

        let mockedFn = mock(greeting);
        let err = new Error('Unexpected error');
        mockedFn.throws(err);

        // verify error
        expect(mockedFn()).toThrowError('Unexpected error');
    });
});
