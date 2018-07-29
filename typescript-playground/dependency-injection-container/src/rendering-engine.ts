import {ContextCreator} from './manager/context-creator';
import {InjectableClass, Releasable} from './di-container';
import {SceneManager} from './manager/scene-manager';
import {AnimationManager} from './manager/animation-manager';
import {InteractionManager} from './manager/interaction-manager';
import {ProgramManager} from './manager/program-manager';
import {FramebufferManager} from './manager/framebuffer-manager';

@InjectableClass()
export class RenderingEngine implements Releasable {

    constructor(private _contextCreator: ContextCreator,
                private _programManager: ProgramManager,
                private _framebufferManager: FramebufferManager,
                private _sceneManager: SceneManager,
                private _animationManager: AnimationManager,
                private _interactionManager: InteractionManager) {
    }

    setup(config: string) {
        this._contextCreator.setup(config);
    }

    release() {
        // release ressources
        console.log(`Release ressources for RenderingEngine`);
    }

    get contextCreator(): ContextCreator {
        return this._contextCreator;
    }

    get programManager(): ProgramManager {
        return this._programManager;
    }

    get framebufferManager(): FramebufferManager {
        return this._framebufferManager;
    }

    get sceneManager(): SceneManager {
        return this._sceneManager;
    }

    get animationManager(): AnimationManager {
        return this._animationManager;
    }

    get interactionManager(): InteractionManager {
        return this._interactionManager;
    }
}