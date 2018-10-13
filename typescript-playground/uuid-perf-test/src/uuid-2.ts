/**
 * Utility for random numbers.
 */
export class UUID2 {

    constructor() {
    }

    /**
     * Generates a 'pseudo-random' identifier.
     */
    public generate(): string {
        let now = Date.now();
        if (window.performance && typeof window.performance.now === 'function') {
            now += performance.now(); // use high-precision timer if available
        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
            const random = (now + Math.random() * 16) % 16 | 0; // tslint:disable-line:no-bitwise
            now = Math.floor(now / 16);
            return (char === 'x' ? random : (random & 0x3 | 0x8)).toString(16); // tslint:disable-line:no-bitwise
        });
    }
}

// make singleton
export const uuid2 = new UUID2();