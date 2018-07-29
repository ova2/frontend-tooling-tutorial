import {InjectableClass} from '../di-container';
import {uuid} from '../util/uuid';

@InjectableClass()
export class ContextCreator {

    private readonly _uuid: string;

    constructor() {
        this._uuid = uuid.generate();
    }

    public setup(config: string): void {
        console.log(config);
    }

    get uuid(): string {
        return this._uuid;
    }
}