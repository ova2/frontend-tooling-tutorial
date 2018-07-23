import {RenderingEngineInjectable} from "../di-container";
import {SceneManager} from "./scene-manager";
import {uuid} from "../util/uuid";

@RenderingEngineInjectable()
export class FramebufferManager implements Releasable {

    private _uuid: string;

    constructor(private sceneManager: SceneManager) {
        this._uuid = uuid.generate();
    }

    public release() {
        // release ressources
        this._uuid = null;
        console.log(`Release ressources for FramebufferManager`);
    }

    get uuid(): string {
        return this._uuid;
    }
}