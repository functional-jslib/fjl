import {expectError, expectFalse, expectTrue} from "../helpers";
import {and} from "../../packages/list/and";

describe('#and', () => {
    // @todo tabelize tests here
    it('should return `true` when all items of a container are "truthy".', () => {
        expectTrue(and(['a', 1, 99, true, ((): void => undefined), {}, []]));
    });
    it('should return `false` when not all items of a container are "truthy".', () => {
        expectFalse(and(['a', 1, 0, true, ((): void => undefined), {}, []]));
    });
    it('should return `false` when receiving an empty list or nothing.', () => {
        expectFalse(and(''));
        expectFalse(and([]));
        expectFalse(and(['']));
        expectFalse(and([null]));
        expectFalse(and([undefined]));
        expectFalse(and([false]));
    });
    it('should an error when receiving nothing', () => {
        expectError(() => and(undefined));
        expectError(() => and(null));
    });
});
