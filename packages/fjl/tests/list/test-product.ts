import {expectEqual, expectError} from "../helpers";
import {product, range} from "../../src/list";

describe('#product', () => {
    it('should be able return the product of a given list', () => {
        expectEqual(product(range(1, 5)), 120);
        expectEqual(product(range(-5, -1)), -120);
    });
    it('should return `0` when receiving an empty list', () => {
        expectEqual(product([]), 1);
    });
    it('should throw an error when receiving nothing (`null` or `undefined`)', () => {
        expectError(() => product(null));
        expectError(() => product(undefined));
    });
});
