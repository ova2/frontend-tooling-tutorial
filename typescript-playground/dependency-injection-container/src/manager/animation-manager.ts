import {RenderingEngineService} from "../di-container";
import {SceneManager} from "./scene-manager";
import {FramebufferManager} from "./framebuffer-manager";

@RenderingEngineService()
export class AnimationManager {

    constructor(private sceneManager: SceneManager, private framebufferManager: FramebufferManager) {
        console.log(`Created AnimationManager`);
    }
}