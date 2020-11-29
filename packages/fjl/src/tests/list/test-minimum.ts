import {expectEqual, expectError} from "../helpers";
import {minimum, range} from "../../list";

describe('#minimum', () => {
    it('should be able return the minimum of a given list', () => {
        expectEqual(minimum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 1);
        expectEqual(minimum(range(-5, -1).concat([-3, -5, -7])), -7);
    });
    it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', () => {
        expectError(() => minimum(null));
        expectError(() => minimum(undefined));
    });
});