import { expectTrue } from "../helpers";
import { all, length, partition } from "../../packages/list";
import { isArray, isString } from "../../packages/object/is";
describe('#partition', () => {
    it('should take elements into first list while predicate is fulfilled and elements ' +
        'that didn\'t match into second list', () => {
        const word = 'abcdefg', expectedResults = ['abcdfg', 'e'], predicate = x => x !== 'e';
        // Expect matched length and matched elements
        expectTrue(
        // Ensure cases for each use case
        all(tuple => length(expectedResults) === length(tuple) &&
            all((tuplePart, ind) => 
            // Ensure tuple part is of allowed type
            (isString(tuplePart) || isArray(tuplePart)) &&
                // Ensure correct length of items in returned element
                length(expectedResults[ind]) === length(tuplePart) &&
                // Ensure elements where matched
                all((x, ind2) => x === expectedResults[ind][ind2], tuplePart), tuple), 
        // Use cases (one with string other with list)
        [partition(predicate, word.split('')), partition(predicate, word)]));
    });
    it('should return an list of empty arrays and/or strings when an empty list is passed in', () => {
        expectTrue(all(tuple => length(tuple) === 2 &&
            all(tuplePart => (isString(tuplePart) || isArray(tuplePart)) &&
                length(tuplePart) === 0, tuple), [partition(a => a, ''), partition(x => x, [])]));
    });
});
//# sourceMappingURL=test-partition.js.map