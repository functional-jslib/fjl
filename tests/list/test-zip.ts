import {all, foldl, length, splitAt, zip} from "../../packages/list";
import {alphabetArray, expectEqual, expectTrue} from "../helpers";

describe('#zip', () => {
    it('should be able to zip two lists into a list of tuples (list of two items).', () => {
        const [list1, list2] = splitAt(length(alphabetArray) / 2, alphabetArray),
            result = zip(list1, list2),
            expectedResult = foldl((agg, item, ind) => {
                agg.push([item, list2[ind]]);
                return agg;
            }, [], list1);
        expectTrue(all(() => 13, [length(list1), length(list2)]));
        expectEqual(length(result), length(expectedResult));
        expectTrue(all((tuple, ind) => tuple[0] === expectedResult[ind][0] &&
            tuple[1] === expectedResult[ind][1]
            , result));
    });
    it('should return an empty list when empty lists are passed', () => {
        expectEqual(zip([], []), []);
    });
    it('should return a copy of the passed in populated list when one of them is not populated.', () => {
        expectEqual(zip([], alphabetArray), []);
        expectEqual(zip(alphabetArray, []), []);
    });
});
