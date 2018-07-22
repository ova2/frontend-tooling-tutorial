import {RenderingEngineService} from "../di-container";
import {ContextCreator} from "./context-creator";

@RenderingEngineService()
export class ProgramManager {

    constructor(private contextCreator: ContextCreator) {
        console.log(`Created ProgramManager`);
    }
}