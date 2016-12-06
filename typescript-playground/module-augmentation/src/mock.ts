interface Mock {
    (...args: any[]): Function;
    // return the provided value
    returns(obj: any): void;
    // throw the provided exception object
    throws(err: Error): void;
}

export function mock(fn: Function): Mock {
    let _mock: any = function (...args: any[]) {
        // do nothing
    };

    _mock.returns = function (obj: any) {
        _mock = function (...args: any[]) {
            return obj;
        };
    };

    _mock.throws = function (err: Error) {
        _mock = function (...args: any[]) {
            throw err;
        };
    };

    return <Mock>_mock;
}
