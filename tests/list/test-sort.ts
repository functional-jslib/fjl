import {__, alphabetArray, expectEqual} from "../helpers";
import {range, reverse, sort, take} from "../../packages/list";
import {compose} from "../../packages/function";

describe('#sort', () => {
    it('should sort a list in ascending order', () => {
        expectEqual(sort(range(10, 0, -1)), range(0, 10, 1));
        expectEqual(sort(range(0, 10)), range(0, 10));
        compose(expectEqual(__, alphabetArray), sort, reverse)(alphabetArray);
        compose(/*log,*/ sort, reverse)(alphabetArray);
    });
    it('should return a copy of original list when said list is already sorted', () => {
        compose(expectEqual(__, ['a', 'b', 'c']), sort, take(3))(alphabetArray);
        compose(expectEqual(__, ['a', 'b', 'c']), sort, take(3))(alphabetArray);
        compose(expectEqual(__, alphabetArray), sort)(alphabetArray);
        compose(expectEqual(__, range(0, 10)), sort)(range(0, 10));
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(sort([]), []);
    });
});
