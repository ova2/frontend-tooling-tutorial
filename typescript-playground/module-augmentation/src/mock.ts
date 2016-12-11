import deepEqual = require('deep-equal');

interface Mock {
    (...args: any[]): any | never;
    // return the provided value
    returns(obj: any): Mock;
    // throw the provided exception object
    throws(err: Error): Mock;
    // received arguments to be considered for "returns" / "throws"
    withArgs(...args: any[]): Mock;
}

const meta = {
    withArgs: void 0 as any[],
    returns: void 0 as any,
    throws: void 0 as Error
};

let mockFn: Mock = <Mock>function (...args: any[]) {
    let matchArgs = true;
    if (meta.withArgs !== void 0) {
        // deeply check if arguments are equals
        matchArgs = deepEqual(meta.withArgs, args);
    }

    if (matchArgs && meta.returns !== void 0) {
        return meta.returns;
    }

    if (matchArgs && meta.throws !== void 0) {
        throw meta.throws;
    }
};

mockFn.withArgs = function (...args: any[]): Mock {
    meta.withArgs = args;
    return this;
};

mockFn.returns = function (obj: any): Mock {
    meta.returns = obj;
    meta.throws = void 0;
    return this;
};

mockFn.throws = function (err: Error): Mock {
    meta.throws = err;
    meta.returns = void 0;
    return this;
};

export function mock(): Mock {
    return mockFn;
}
