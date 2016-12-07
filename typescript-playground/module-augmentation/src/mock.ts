interface Mock {
    (...args: any[]): Function;
    // return the provided value
    returns(obj: any): void;
    // throw the provided exception object
    throws(err: Error): void;
}

export function mock(fn: Function): Mock {
    let _mock: Mock = <Mock>function (...args: any[]) {
        // do nothing
    };

    _mock.returns = function (obj: any) {
        return function (...args: any[]) {
            return obj;
        };
    };

    _mock.throws = function (err: Error) {
        return function (...args: any[]) {
            throw err;
        };
    };

    return _mock;
}
