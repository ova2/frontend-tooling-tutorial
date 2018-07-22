import {RenderingEngineService} from "../di-container";

@RenderingEngineService()
export class ContextCreator {

    setup(text: string): void {
        console.log(text);
    }
}