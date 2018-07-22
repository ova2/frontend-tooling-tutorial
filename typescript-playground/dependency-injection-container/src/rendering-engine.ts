import {ContextCreator} from "./manager/context-creator";
import {Injector, RenderingEngineService} from "./di-container";
import {SceneManager} from "./manager/scene-manager";
import {AnimationManager} from "./manager/animation-manager";

@RenderingEngineService()
export class RenderingEngine {

    constructor(private contextCreator: ContextCreator, private sceneManager: SceneManager, private animationManager: AnimationManager) {
    }

    setup(text: string) {
        this.contextCreator.setup(text);
    }
}

export function bootstrapRenderingEngine(text: string) {
    const injector = new Injector();
    let re = injector.resolve<RenderingEngine>(RenderingEngine);
    re.setup(text);
}