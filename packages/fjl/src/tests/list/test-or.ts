import {expectError, expectFalse, expectTrue} from "../helpers";
import {or} from "../../list";

describe('#or', () => {
    it('should return `true` when, at least, one of the items is "truthy".', () => {
        expectTrue(or([0, false, null, 1, undefined]));
    });
    it('should return `false` when all of the items are "falsy".', () => {
        expectFalse(or([0, false, null, undefined, '']));
    });
    it('should return `false` when an empty list is received.', () => {
        expectFalse(or([]));
    });
    it('should throw an error when receiving nothing (`null` or `undefined`).', () => {
        expectError(() => or(null));
        expectError(() => or(undefined));
    });
});
