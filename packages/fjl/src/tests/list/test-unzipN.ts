import {all, length, splitAt, unfoldr, unzipN} from "../../list";
import {alphabetArray, expectEqual, expectTrue} from "../helpers";

describe('#unzipN', () => {
    it('should be able to unzip a list of tuples of any number.', () => {
        const subj = unfoldr(remainder => {
                return !length(remainder) ?
                    undefined : splitAt(2, remainder);
            }, alphabetArray),
            lenAlphaArray = length(alphabetArray),
            result = unzipN(subj);

        // First ensure our subject is valid
        // --------------------------------------
        // Check that we have tuples of two (list of two in javascript's/our case)
        expectTrue(all(tuple => length(tuple) === 2, subj));

        // Ensure subject has expected length of items (tuples)
        expectEqual(length(subj), lenAlphaArray / 2);

        // Test result
        // ----------------
        // Ensure we have two lists (one for each part of tuple in `subj`).
        expectEqual(length(result), 2);

        // Ensure both lists in result have the expected length
        expectTrue(all(list => length(list) === lenAlphaArray / 2, result));

        // Ensure resulting lists contain expected items
        expectTrue(all(
            (list, i) =>
                all((item, j) => item === subj[j][i], list),
            result
        ));

    });
    it('should throw an error when passed in arg is `null` or `undefined`', () => {
        expect(() => unzipN(undefined)).toThrow(Error);
        expect(() => unzipN(null)).toThrow(Error);
    });
});
