import 'reflect-metadata';

interface Type<T> {
    new(...args: any[]): T;
}

/**
 * Decorator function to annotate classes which can inject another ones in constructors.
 * A decorator is required to be able to get Reflect's metadata.
 */
export const InjectableClass = (): (target: Type<any>) => void => {
    return (target: Type<any>) => {
        // do something if needed
    };
};

/**
 * Lifecycle hook that is used for releasing a resource. It will be called automatically by DI container.
 */
export interface Releasable {
    release(): void;
}

/**
 * Every entry point class instance starts its own dependency container.
 * Injector ensures that all decorated classes in the container are singletons.
 */
export class Injector extends Map {

    public resolve<T>(target: Type<any>): T {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: Type<any>) => this.resolve<any>(token));

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
        for (const value of this.values()) {
            if (typeof value['release'] === 'function') {
                value['release']();
            }
        }

        this.clear();
    }
}

/**
 * Bootstraps the entry point class instance of type T.
 *
 * @returns entry point class instance and the "release" function which releases the DI container
 */
export const bootstrap = <T>(target: Type<any>): [T, () => void] => {
    // there is exactly one Injector pro entry point class instance
    const injector = new Injector();
    // bootstrap all dependencies
    const entryClass = injector.resolve<T>(target);

    return [entryClass, () => injector.release()];
};