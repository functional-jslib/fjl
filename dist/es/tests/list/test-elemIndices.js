import { alphabetArray } from "../helpers";
import { elemIndices } from "../../packages/list/elemIndices";
describe('#elemIndices', () => {
    [
        ['aeiou', 'i', [2]],
        ['sjljs', 'j', [1, 3]],
        ['radar', 'r', [0, 4]],
        ['radar', 'a', [1, 3]],
        [
            alphabetArray.concat(alphabetArray, alphabetArray, alphabetArray), 'b', [1, 27, 53, 79]
        ],
        [[0, 1, 2, 3, 4], 99, undefined]
    ]
        .forEach(([subj, search, expected]) => {
        const subjAsStr = subj.constructor === String ? subj : `[${subj.join(', ')}]`, expectedAsStr = !expected || expected.constructor === String ?
            expected : `[${expected.join(', ')}]`;
        it(`elemIndices(${search}, ${subjAsStr}) === ${expectedAsStr}`, () => {
            const result = elemIndices(search, subj);
            expect(result).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-elemIndices.js.map