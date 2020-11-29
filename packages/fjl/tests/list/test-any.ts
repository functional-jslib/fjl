import {expectError, expectFalse, expectTrue} from "../helpers";
import {any} from "../../src/list/any";
import isTruthy from '../../src/boolean/isTruthy'

describe('#any', () => {
    // @todo tabelize tests here
    const id = (x: any): any => x;
    it('should return `true` when any item matches predicate.', () => {
        expectTrue(any(isTruthy, [0, false, null, 1, undefined]));
        expectTrue(any(isTruthy, ['hello']));
        expectTrue(any(x => x === 'e', 'hello'));
    });
    it('should return `false` when no item in received items matches predicate.', () => {
        expectFalse(any(isTruthy, [0, false, null, undefined, '']));
        expectFalse(any(isTruthy, [0]));
        expectFalse(any(x => x === 'e', 'avalon'));
    });
    it('should return `false` when an empty list is received.', () => {
        expectFalse(any(id, []));
        expectFalse(any(id, ''));
    });
    it('should throw an error when receiving nothing (`null` or `undefined`).', () => {
        expectError(() => any(id, null));
        expectError(() => any(id, undefined));
    });
});
