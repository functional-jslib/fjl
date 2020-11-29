import {range, reverse, sortOn, take} from "../../list";
import {__, alphabetArray, expectEqual} from "../helpers";
import {compose} from "../../function";

describe('#sortOn', () => {
    const identity = x => x,
        sortOnIdentity = sortOn(identity),
        range0To10 = range(0, 10),
        range10To0 = range(10, 0, -1);
    it('should sort a list in ascending order', () => {
        expectEqual(sortOnIdentity(range10To0), range0To10);
        expectEqual(sortOnIdentity(range0To10), range0To10);
        compose(expectEqual(__, alphabetArray), sortOnIdentity, reverse)(alphabetArray);
        compose(/*log,*/ sortOnIdentity, reverse)(alphabetArray);
    });
    it('should return a copy of original list when said list is already sorted', () => {
        compose(expectEqual(__, ['a', 'b', 'c']), sortOnIdentity, take(3))(alphabetArray);
        compose(expectEqual(__, alphabetArray), sortOnIdentity)(alphabetArray);
        compose(expectEqual(__, range0To10), sortOnIdentity)(range0To10);
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(sortOnIdentity([]), []);
    });
});
