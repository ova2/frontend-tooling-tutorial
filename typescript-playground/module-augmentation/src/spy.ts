import {Mockito} from './mock';

interface Spy {
    (...args: any[]): Function;
    records: any[][];
}

function spyFn(fn: Function): Spy {
    let _spy: Spy = <Spy>function (...args) {
        _spy.records.push(args);
        return fn.apply(this, args);
    };

    _spy.records = [];
    return _spy;
}

// Extend Mockito with a new static function called spy 
Mockito.spy = spyFn;

// Type definition for the spy function 
declare module './mock' {
    namespace Mockito {
        export let spy: typeof spyFn;
    }
}
