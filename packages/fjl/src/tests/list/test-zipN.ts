import {filter, length, range, splitAt, take, unfoldr, zipN} from "../../list";
import {alphabetArray, expectEqual} from "../helpers";

describe('#zipN', () => {
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

            subj3 = filter(length, subj),

            subj4 = filter(length, subj2),

            testCases = [subj, subj2, subj3, subj4].map(s => [zipN.apply(null, s), s])
        ;

        testCases.forEach(([results, subjects]) => {
            results.forEach((list, ind) => {
                list.forEach((char, ind2) => {
                    expectEqual(char, subjects[ind2][ind]);
                });
            });
        });
    });
    it('should return an empty list when empty lists are passed in', () => {
        expectEqual(zipN([], []), []);
    });
    it('should return a copy of the left or right populated list when the other(s) is/are empty.', () => {
        expectEqual(zipN([], alphabetArray), []);
        expectEqual(zipN(alphabetArray, []), []);
    });
});
