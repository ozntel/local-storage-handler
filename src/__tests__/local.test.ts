import { LocalStorageHandler } from '../index';

test('Cache Hours', () => {
    let lsh = new LocalStorageHandler({ cacheHours: 12 });
    expect(lsh.cacheHours).toBe(12);
});

test('Default Cache Hours', () => {
    let lsh = new LocalStorageHandler({});
    expect(lsh.cacheHours).toBe(24);
});

test('Cache Hours Reassign', () => {
    let lsh = new LocalStorageHandler({ cacheHours: 5 });
    lsh.cacheHours = 25;
    expect(lsh.cacheHours).toBe(25);
});
