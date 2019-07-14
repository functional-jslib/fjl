import {alphabetArray, expectEqual, expectError, vowelsString} from "../helpers";
import {elemIndices, range} from "../../src/list";

describe('#elemIndices', () => {
    it('should return all found element indices in a list', () => {
        [
            [vowelsString, 'i', [2]],
            [alphabetArray, 'b', [1]],
            [
                alphabetArray.concat(alphabetArray, alphabetArray, alphabetArray), 'b', [1, 27, 53, 79]
            ],
        ]
            .forEach(([subj, search, expected]) => {
                const result = elemIndices(search, subj);
                expectEqual(result, expected);
            });
    });
    it('should return `undefined` when element is not found in list', () => {
        expectEqual(elemIndices(99, range(0, 10)), undefined);
    });
    it('should throw an error when second arg is not a list.', () => {
        [undefined, null, {}].forEach(x => expectError(() => elemIndices(99, x)));
    });
});
