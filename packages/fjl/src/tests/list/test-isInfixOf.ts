import {and, concatMap, isInfixOf} from "../../list";
import {alphabetArray, alphabetString, expectTrue} from "../helpers";
import {negateF2} from "../../function";

describe('#isInfixOf', () => {
    it('should return `true` when a list is infixed with another', () => {
        const results = concatMap(candidate => [
            isInfixOf(candidate, alphabetString),
            isInfixOf(candidate, alphabetArray)
        ], ['abc', 'efg', 'xyz']);
        expectTrue(and(results));
    });
    it('should return `false` when a list is not infix of second list', () => {
        expectTrue(and([
            negateF2(isInfixOf('!@#'))(alphabetString),
            negateF2(isInfixOf('!@#'.split(''))(alphabetArray))
        ]));
    });
});
