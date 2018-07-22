import {RenderingEngineService} from "../di-container";
import {SceneManager} from "./scene-manager";

@RenderingEngineService()
export class FramebufferManager {

    constructor(private sceneManager: SceneManager) {
        console.log(`Created FramebufferManager`);
    }
}