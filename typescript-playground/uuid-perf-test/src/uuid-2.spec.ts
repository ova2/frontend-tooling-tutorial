import { uuid2 } from './uuid-2';

describe('Performance testing of the 2. UUID implementation', () => {
  beforeEach(function (done) {
    window.setTimeout(function () {
      done();
    }, 0);
  });

  it('should generate unique UUIDs by the 2. implementation', () => {
    const uuid = uuid2.generate();
    expect(uuid).not.toBeNull();
    expect(uuid.length === 36).toBeTruthy();

    let startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      uuid2.generate();
    }
    let endTime = performance.now();

    console.log(`2. implementation: Time to generate 1000 UUIDs: ${endTime - startTime} ms`);

    startTime = performance.now();
    for (let i = 0; i < 10000; i++) {
      uuid2.generate();
    }
    endTime = performance.now();

    console.log(`2. implementation: Time to generate 10000 UUIDs: ${endTime - startTime} ms`);

    startTime = performance.now();
    for (let i = 0; i < 100000; i++) {
      uuid2.generate();
    }
    endTime = performance.now();

    console.log(`2. implementation: Time to generate 100000 UUIDs: ${endTime - startTime} ms`);

    // check uniqueness of 500.000 UUIDs
    const uuids = new Set();
    for (let i = 0; i < 500000; i++) {
      let uuid = uuid2.generate();
      expect(uuids.has(uuid)).toBeFalsy();
      uuids.add(uuid);
    }
  });
});