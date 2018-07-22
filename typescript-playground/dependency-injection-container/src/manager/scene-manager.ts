import {RenderingEngineService} from "../di-container";
import {ProgramManager} from "./program-manager";

@RenderingEngineService()
export class SceneManager {

    constructor(private programManager: ProgramManager) {
        console.log(`Created SceneManager`);
    }
}