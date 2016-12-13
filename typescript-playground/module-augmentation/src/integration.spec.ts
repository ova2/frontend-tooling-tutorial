import {mock} from './mock';
import './spy';

describe('src/mock', () => {
    it('simple mock is a function without return value', () => {
        let mockedFn = mock();

        // verify
        expect(mockedFn(1, 2)).toBeUndefined();
    });

    it('mocked function with defined return value', () => {
        let mockedFn = mock().returns(10);

        // verify
        expect(mockedFn()).toEqual(10);
    });

    it('mocked function which should throw error', () => {
        let err = new Error('Unexpected error');
        let mockedFn = mock().throws(err);

        // verify
        try {
            mockedFn();
            fail('An Error shoud be thrown');
        } catch (e) {
            expect(e).toBe(err);
        }
    });

    it('mocked function with defined arguments and return value', () => {
        let mockedFn = mock().withArgs([1, 2]).returns({a: 'a', b: 'b'});

        // verify
        expect(mockedFn([1, 2])).toEqual({a: 'a', b: 'b'});
        expect(mockedFn(1, 2)).toBeUndefined();
        expect(mockedFn([2, 1])).toBeUndefined();
        expect(mockedFn([1, 2], 'greeting')).toBeUndefined();
    });
});
