import 'reflect-metadata';

interface Type<T> {
    new(...args: any[]): T;
}

export const RenderingEngineService = (): (target: Type<any>) => void => {
    return (target: Type<any>) => {
        // do something
    };
};

export class Injector {

    //private diContainer: Map<any, any> = new Map();

    resolve<T>(target: Type<any>): T {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map(token => this.resolve<any>(token));

        return new target(...injections);
    }
}