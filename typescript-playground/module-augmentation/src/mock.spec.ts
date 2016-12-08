import {mock} from './mock';

describe('src/mock', () => {
    it('simple mock is a function without return value', () => {
        let mockedFn = mock();

        // verify return value of mocked function with some arguments
        expect(mockedFn(1, 2)).toBeUndefined();
    });

    it('mocked function with defined return value', () => {
        let mockedFn = mock().returns(10);

        // verify return value of mocked function
        expect(mockedFn()).toEqual(10);
    });

    it('mocked function which should throw error', (done) => {
        let err = new Error('Unexpected error');
        let mockedFn = mock().throws(err);

        // verify error
        try {
            mockedFn();
        } catch (e) {
            expect(e).toBe(err);
            done();
        }

        fail('An Error shoud be thrown');
    });

    it('mocked function with defined arguments and return value', () => {
        let mockedFn = mock().withArgs([1, 2]).returns({a: 'a', b: 'b'});

        // verify return value of mocked function with defined arguments
        expect(mockedFn([1, 2])).toEqual({a: 'a', b: 'b'});
        expect(mockedFn([3, 4])).toBeUndefined();
    });
});
