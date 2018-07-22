import {bootstrapRenderingEngine} from "./rendering-engine";

describe('Injector', () => {
    it('should setup Rendering Engine', () => {
        let re = bootstrapRenderingEngine("Setup Rendering Engine");

        //expect(re.sceneManager).not.toBeNull();
        //expect(re.animationManager).not.toBeNull();
    });
});