import {uuid1} from './uuid-1';
import {uuid2} from './uuid-2';

describe('Performance testing of UUID implementations', () => {
    it('should generate UUID by the 1. implementation', () => {
        let uuid = uuid1.generate();
        console.log(`1. UUID impl. generated: ${uuid}`);

        expect(uuid).not.toBeNull();

        uuid = uuid2.generate();
        console.log(`2. UUID impl. generated: ${uuid}`);

        expect(uuid).not.toBeNull();
    });
});