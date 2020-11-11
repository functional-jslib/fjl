import {subsequences} from "../../packages/list/subsequence";
import {expectEqual, expectTrue} from "../helpers";

describe('#subsequences', () => {
    it('should return all sub-sequences of a sequence', () => {
        const candidates = ['abc', 'abc'.split('')],
            results = candidates.map(subsequences),
            expectedLen = Math.pow(2, candidates[0].length);

        // Check expected result lengths
        expectTrue(results.every(result => result.length === expectedLen));

        // Ensure generated subsequences are unique in their sets
        expectTrue(results.every(result =>
                !result.filter((subSeq, ind) =>
                    result.indexOf(subSeq) !== ind ||
                    result.lastIndexOf(subSeq) !== ind
                ).length
            )
        );
        // @see quick reference on subsequence algorithms
        // https://discuss.codechef.com/questions/17235/print-all-possible-subsequences-of-string-using-dynamic-programming
    });
    it('should return a list with an empty list when receiving an empty list', () => {
        expectEqual(subsequences([]), [[]]);
        expectEqual(subsequences(''), [[]]);
    });
});
