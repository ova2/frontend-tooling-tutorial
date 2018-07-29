import {InjectableClass, Releasable} from '../di-container';
import {ProgramManager} from './program-manager';
import {uuid} from '../util/uuid';

@InjectableClass()
export class SceneManager implements Releasable {

    private _uuid: string;

    constructor(private programManager: ProgramManager) {
        this._uuid = uuid.generate();
    }

    public release() {
        // release ressources
        this._uuid = null;
        console.log(`Release ressources for SceneManager`);
    }

    get uuid(): string {
        return this._uuid;
    }
}