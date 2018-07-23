import 'reflect-metadata';

interface Type<T> {
    new(...args: any[]): T;
}

/**
 * Decorator function to annotate classes which can inject another ones in constructors.
 * A decorator is required in order to have Reflect's metadata.
 */
export const RenderingEngineInjectable = (): (target: Type<any>) => void => {
    return (target: Type<any>) => {
        // do something if needed
    };
};

/**
 * Every Rendering Engine instance starts its own dependency container.
 * Injector ensures that all services in the container are singletons.
 */
export class Injector extends Map {

    public resolve<T>(target: Type<any>): T {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map(token => this.resolve<any>(token));

        const classInstance = this.get(target);
        if (classInstance) {
            return classInstance;
        }

        const newClassInstance = new target(...injections);
        this.set(target, newClassInstance);

        console.log(`DI-Container created class ${newClassInstance.constructor.name}`);

        return newClassInstance;
    }

    public release(): void {
        for (let value of this.values()) {
            if (typeof value['release'] === 'function') {
                value['release']();
            }
        }

        this.clear();
    }
}