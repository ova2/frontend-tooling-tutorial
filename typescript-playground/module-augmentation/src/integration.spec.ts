import {Mockito} from './mock';
import './spy';

describe('test mock and spy functionalities', () => {
    it('simple mock is a function without return value', () => {
        let mockedFn = Mockito.mock();

        // verify
        expect(mockedFn(1, 2)).toBeUndefined();
    });

    it('mocked function with defined return value', () => {
        let mockedFn = Mockito.mock().returns(10);

        // verify
        expect(mockedFn()).toEqual(10);
    });

    it('mocked function which should throw error', () => {
        let err = new Error('Unexpected error');
        let mockedFn = Mockito.mock().throws(err);

        // verify
        try {
            mockedFn();
            fail('An Error shoud be thrown');
        } catch (e) {
            expect(e).toBe(err);
        }
    });

    it('mocked function with defined arguments and return value', () => {
        let mockedFn = Mockito.mock().withArgs([1, 2]).returns({a: 'a', b: 'b'});

        // verify
        expect(mockedFn([1, 2])).toEqual({a: 'a', b: 'b'});
        expect(mockedFn(1, 2)).toBeUndefined();
        expect(mockedFn([2, 1])).toBeUndefined();
        expect(mockedFn([1, 2], 'greeting')).toBeUndefined();
    });

    it('spy should record number of calls and used arguments', () => {
        function log(...args: any[]): void {
            console.log(`Called with ${args}`);
        }

        let spiedLog = Mockito.spy(log);
        spiedLog('Hello', 'World');
        spiedLog(123, 456);

        // get recorded arguments
        let records: any[][] = spiedLog.records;

        // verify number of calls
        expect(records.length).toBe(2);
        // verify arguments the spied function was called with
        expect(records[0][0]).toBe('Hello');
        expect(records[0][1]).toBe('World');
        expect(records[1][0]).toBe(123);
        expect(records[1][1]).toBe(456);
    });
});
