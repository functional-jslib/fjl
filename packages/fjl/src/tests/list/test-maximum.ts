import {expectEqual, expectError} from "../helpers";
import {maximum} from "../../list/maximum";

describe('#maximum', () => {
    it('should be able return the maximum of a given list', () => {
        expectEqual(maximum([1, 2, 3, 4, 5, 1, 3, 4, 3, 2, 3]), 5);
        expectEqual(maximum([-5, -4, -3, -2, -1, -3, -5, -7]), -1);
    });
    it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', () => {
        expectError(() => maximum(null));
        expectError(() => maximum(undefined));
        // expectEqual(minimum([]), Infinity);
        expectError(maximum);
    });
});
