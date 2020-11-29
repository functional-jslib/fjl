import {all, filter, length, range, splitAt, take, unfoldr, zipWith} from "../../packages/list";
import {alphabetArray, expectEqual, expectTrue} from "../helpers";

describe('#zipWith', () => {
    const tuplize = (a, b) => [a, b];
    it('should be able to zip the given number of lists.', () => {
        // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
        const subj = unfoldr(remainder => {
                return !length(remainder) ?
                    undefined : splitAt(5, remainder);
            }, take(25, alphabetArray)),

            subj2 = [
                range(1, 5),
                range(8, 13),
                [],
                range(13, 21),
                []
            ],

            zipWithResult = zipWith(tuplize, ...subj),

            zipWithResult2 = zipWith(tuplize, ...subj2);

        expectTrue(
            all(tuple =>
                    all((list, ind) =>
                            all((item, ind2) =>
                                item === tuple[1][ind2][ind], list
                            ),
                        tuple[0]
                    ),
                [[zipWithResult, filter(length, subj)],
                    [zipWithResult2, filter(length, subj2)]]
            )
        );
    });
    it('should return an empty list when empty lists are passed', () => {
        expectEqual(zipWith(tuplize, [], []), []);
    });
    it('should return a copy of the passed in populated list when one of them is not populated.', () => {
        expectEqual(zipWith(tuplize, [], alphabetArray), []);
        expectEqual(zipWith(tuplize, alphabetArray, []), []);
    });
});
