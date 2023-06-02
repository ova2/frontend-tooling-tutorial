describe('Performance testing of the 4. UUID implementation (native)', () => {
  beforeEach(function (done) {
    window.setTimeout(function () {
      done();
    }, 0);
  });

  it('should generate unique UUIDs by the 4. native implementation', () => {
    const uuid = crypto.randomUUID();
    expect(uuid).not.toBeNull();
    expect(uuid.length === 36).toBeTruthy();

    let startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      crypto.randomUUID();
    }
    let endTime = performance.now();

    console.log(`4. native implementation: Time to generate 1000 UUIDs: ${endTime - startTime} ms`);

    startTime = performance.now();
    for (let i = 0; i < 10000; i++) {
      crypto.randomUUID();
    }
    endTime = performance.now();

    console.log(`4. native implementation: Time to generate 10000 UUIDs: ${endTime - startTime} ms`);

    startTime = performance.now();
    for (let i = 0; i < 100000; i++) {
      crypto.randomUUID();
    }
    endTime = performance.now();

    console.log(`4. native implementation: Time to generate 100000 UUIDs: ${endTime - startTime} ms`);

    // check uniqueness of 500.000 UUIDs
    const uuids = new Set();
    for (let i = 0; i < 500000; i++) {
      let uuid = crypto.randomUUID();
      expect(uuids.has(uuid)).toBeFalsy();
      uuids.add(uuid);
    }
  });
});