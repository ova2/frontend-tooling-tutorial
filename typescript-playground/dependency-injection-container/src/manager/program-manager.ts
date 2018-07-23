import {RenderingEngineInjectable} from "../di-container";
import {ContextCreator} from "./context-creator";
import {uuid} from "../util/uuid";

@RenderingEngineInjectable()
export class ProgramManager implements Releasable {

    private _uuid: string;

    constructor(private contextCreator: ContextCreator) {
        this._uuid = uuid.generate();
    }

    public release() {
        // release ressources
        this._uuid = null;
        console.log(`Release ressources for ProgramManager`);
    }

    get uuid(): string {
        return this._uuid;
    }
}