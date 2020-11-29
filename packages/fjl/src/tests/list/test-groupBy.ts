import {groupBy} from "../../list/groupBy";
import {alphabetArray, expectEqual, generalEqualityCheck, vowelsArray, vowelsString} from "../helpers";
import {SliceOf} from "../../platform/slice";
import {BinaryPred} from "../../types";

describe('#groupBy', () => {
    it('should return a list of lists which contain the (sequential) matches on equality function', () => {
        const expectedResult = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];
        expectEqual(groupBy(generalEqualityCheck, 'Mississippi'), expectedResult.map(xs => xs.join('')));
        expectEqual(
            groupBy(generalEqualityCheck, 'Mississippi'.split('')),
            expectedResult
        );
    });
    it('should return a list of lists containing individual un-grouped items or items that do not match equality function', () => {
        expectEqual(
            groupBy(generalEqualityCheck, alphabetArray),
            alphabetArray.map(char => [char]));
    });
});
