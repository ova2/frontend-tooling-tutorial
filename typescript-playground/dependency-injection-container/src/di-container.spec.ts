import {bootstrap} from './di-container';
import {RenderingEngine} from './rendering-engine';

describe('Injector Testing', () => {
    it('should setup and release two Rendering Engines with their own dependencies', () => {
        const [renderinEngine1, release1] = bootstrap<RenderingEngine>(RenderingEngine);
        renderinEngine1.setup('Setup Rendering Engine 1');

        expect(renderinEngine1).not.toBeNull();
        expect(renderinEngine1.contextCreator).not.toBeNull();
        expect(renderinEngine1.programManager).not.toBeNull();
        expect(renderinEngine1.sceneManager).not.toBeNull();
        expect(renderinEngine1.framebufferManager).not.toBeNull();
        expect(renderinEngine1.animationManager).not.toBeNull();
        expect(renderinEngine1.interactionManager).not.toBeNull();

        const uuid11 = renderinEngine1.contextCreator.uuid;
        const uuid12 = renderinEngine1.programManager.uuid;
        const uuid13 = renderinEngine1.sceneManager.uuid;
        const uuid14 = renderinEngine1.framebufferManager.uuid;
        const uuid15 = renderinEngine1.animationManager.uuid;
        const uuid16 = renderinEngine1.interactionManager.uuid;

        const [renderinEngine2, release2] = bootstrap<RenderingEngine>(RenderingEngine);
        renderinEngine2.setup('Setup Rendering Engine 2');

        expect(renderinEngine2).not.toBeNull();
        expect(renderinEngine2.contextCreator).not.toBeNull();
        expect(renderinEngine2.programManager).not.toBeNull();
        expect(renderinEngine2.sceneManager).not.toBeNull();
        expect(renderinEngine2.framebufferManager).not.toBeNull();
        expect(renderinEngine2.animationManager).not.toBeNull();
        expect(renderinEngine2.interactionManager).not.toBeNull();

        const uuid21 = renderinEngine2.contextCreator.uuid;
        const uuid22 = renderinEngine2.programManager.uuid;
        const uuid23 = renderinEngine2.sceneManager.uuid;
        const uuid24 = renderinEngine2.framebufferManager.uuid;
        const uuid25 = renderinEngine2.animationManager.uuid;
        const uuid26 = renderinEngine2.interactionManager.uuid;

        // every rendering engine instance starts its own dependency container with singleton services
        // => UUIDs should be unique pro rendering engine instance
        expect(uuid11).not.toBe(uuid21);
        expect(uuid12).not.toBe(uuid22);
        expect(uuid13).not.toBe(uuid23);
        expect(uuid14).not.toBe(uuid24);
        expect(uuid15).not.toBe(uuid25);
        expect(uuid16).not.toBe(uuid26);

        // release the first rendering engine
        release1();

        expect(renderinEngine1.contextCreator.uuid).not.toBeNull();
        expect(renderinEngine1.programManager.uuid).toBeNull();
        expect(renderinEngine1.sceneManager.uuid).toBeNull();
        expect(renderinEngine1.framebufferManager.uuid).toBeNull();
        expect(renderinEngine1.animationManager.uuid).not.toBeNull();
        expect(renderinEngine1.interactionManager.uuid).not.toBeNull();

        // release the second rendering engine
        release2();

        expect(renderinEngine2.contextCreator.uuid).not.toBeNull();
        expect(renderinEngine2.programManager.uuid).toBeNull();
        expect(renderinEngine2.sceneManager.uuid).toBeNull();
        expect(renderinEngine2.framebufferManager.uuid).toBeNull();
        expect(renderinEngine2.animationManager.uuid).not.toBeNull();
        expect(renderinEngine2.interactionManager.uuid).not.toBeNull();
    });
});