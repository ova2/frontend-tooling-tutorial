interface Spy {
    (...args: any[]): Function;
    records: any[][];
}

export function spy(fn: Function): Spy {
    let _spy: Spy = <Spy>function (...args) {
        _spy.records.push(args);
        return fn.apply(this, args);
    };

    _spy.records = [];
    return _spy;
}
