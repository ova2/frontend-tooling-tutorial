import {uuid1} from './uuid-1';

describe('Performance testing of the 1. UUID implementation', () => {
    beforeEach(function(done) {
        window.setTimeout(function() {
            done();
        }, 0);
    });

    it('should generate unique UUIDs by the 1. implementation', () => {
        const uuid = uuid1.generate();
        expect(uuid).not.toBeNull();
        expect(uuid.length === 36).toBeTruthy();

        let startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            uuid1.generate();
        }
        let endTime = performance.now();

        console.log(`1. implementation: Time to generate 1000 UUIDs: ${endTime - startTime} ms`);

        startTime = performance.now();
        for (let i = 0; i < 10000; i++) {
            uuid1.generate();
        }
        endTime = performance.now();

        console.log(`1. implementation: Time to generate 10000 UUIDs: ${endTime - startTime} ms`);

        startTime = performance.now();
        for (let i = 0; i < 100000; i++) {
            uuid1.generate();
        }
        endTime = performance.now();

        console.log(`1. implementation: Time to generate 100000 UUIDs: ${endTime - startTime} ms`);

        // check uniqueness of 500.000 UUIDs
        const uuids = new Set();
        for (let i = 0; i < 500000; i++) {
            let uuid = uuid1.generate();
            expect(uuids.has(uuid)).toBeFalsy();
            uuids.add(uuid);
        }
    });
});