// @todo remove library methods used as auxillary methods from pertinent tests (et. al. `compose`, `take`, `range` and `reverse`)
import { __, alphabetArray, expectEqual, genericOrdering } from "../helpers";
import { sortBy } from "../../packages/list/sortBy";
import { range } from "../../packages/list/range";
import { compose } from "../../packages/function/compose";
import { reverse } from "../../packages/list/reverse";
import { take } from "../../packages/list/take";
describe('#sortBy', () => {
    it('should sort a list by ordering function', () => {
        expectEqual(sortBy(genericOrdering, range(10, 0, -1)), range(0, 10, 1));
        expectEqual(sortBy(genericOrdering, range(0, 10)), range(0, 10));
        compose(expectEqual(__, alphabetArray), value => sortBy(genericOrdering, value), reverse)(alphabetArray);
        compose(/*log,*/ /*log,*/ value => sortBy(genericOrdering, value), reverse)(alphabetArray);
    });
    it('should return a copy of original list when said list is already sorted', () => {
        compose(expectEqual(__, ['a', 'b', 'c']), xs => sortBy(genericOrdering, xs))(take(3, alphabetArray));
        compose(expectEqual(__, ['a', 'b', 'c']), xs => sortBy(genericOrdering, xs))(take(3, alphabetArray));
        compose(expectEqual(__, alphabetArray), xs => sortBy(genericOrdering, xs))(alphabetArray);
        compose(expectEqual(__, range(0, 10)), xs => sortBy(genericOrdering, xs))(range(0, 10));
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(sortBy(genericOrdering, []), []);
    });
});
//# sourceMappingURL=test-sortBy.js.map