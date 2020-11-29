import {all, drop, isSubsequenceOf, take} from "../../src/list";
import {alphabetString, expectTrue} from "../helpers";

describe('#isSubsequenceOf', () => {
    it('should return true a list is sub-sequence of another.', () => {
        const listToSearchIn = take(6, alphabetString);
        expectTrue(all(
            listToSearchFor => isSubsequenceOf(listToSearchFor, listToSearchIn),
            ['bdf', 'ace', 'abc', 'def']
        ));
    });
    it('should return false a list is not sub-sequence of another.', () => {
        const listToSearchIn = take(6, drop(6, alphabetString));
        expectTrue(all(
            listToSearchFor => !isSubsequenceOf(listToSearchFor, listToSearchIn),
            ['bdf', 'ace', 'abc', 'def']
        ));
    });
});
