import {all, isSuffixOf, length, splitAt, tails} from "../../src/list";
import {alphabetArray, alphabetString, expectTrue} from "../helpers";
import {negateF2} from "../../src/function";

describe('#isSuffixOf', () => {
    it('should return `true` when a list is a suffix of another', () => {
        const candidateString = splitAt(length(alphabetString) - 2, tails(alphabetString))[0];
        expectTrue(all(
            isSuffixOf('xyz'),
            candidateString
        ));
        expectTrue(all(
            isSuffixOf('xyz'.split('')),
            splitAt(length(alphabetArray) - 2, tails(alphabetArray))[0]
        ));
    });
    it('should return `false` when a list is not suffix of second list', () => {
        expectTrue(all(
            negateF2(isSuffixOf('!@#')),
            splitAt(length(alphabetString) - 2, tails(alphabetString))[0]
        ));
        expectTrue(all(
            negateF2(isSuffixOf('!@#'.split(''))),
            splitAt(length(alphabetString) - 2, tails(alphabetArray))[0]
        ));
    });
});