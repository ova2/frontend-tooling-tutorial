import {Mock, mock as mockOriginal} from './mock';

declare module './mock' {
    interface Mock {
        records: any[][];
    }
}

function mock(fn: Function): Mock {
    if (typeof fn === 'function') {
        let _spy: Mock = <Mock>function (...args: any[]) {
            _spy.records.push(args);
            return fn.apply(this, args);
        };

        _spy.records = [];

        return _spy;
    } else {
        return mockOriginal();
    }
}

