import { expectEqual, vowelsArray, vowelsString } from "../helpers";
import { dropWhile } from '../../packages/list/dropWhile';
describe('#dropWhile', () => {
    const alnumRegex = /^[a-z]$/i, alnumPred = (x) => alnumRegex.test(x), nonAlnumPred = (x) => !alnumPred(x), getCharCodeLessThan = (lessThanCharCode) => {
        const methodName = `charCodeLessThan${lessThanCharCode}`;
        return {
            [methodName]: (x) => (x + '').charCodeAt(0) < lessThanCharCode
        }[methodName];
    };
    [
        [vowelsArray, alnumPred, []],
        [vowelsString, alnumPred, ''],
        [vowelsArray, nonAlnumPred, vowelsArray],
        [vowelsString, nonAlnumPred, vowelsString],
    ]
        .concat(vowelsArray.map((c, ind) => [vowelsArray, getCharCodeLessThan(c.charCodeAt(0)), vowelsArray.slice(ind)]), vowelsString.split('').map((c, ind) => [vowelsString, getCharCodeLessThan(c.charCodeAt(0)), vowelsString.slice(ind)]))
        .forEach(([subj, pred, expected]) => {
        const testCaseName = `dropWhile(${pred.name}, ${subj}) === ${expected}`;
        it(testCaseName, () => {
            const result = dropWhile(pred, subj);
            expectEqual(result, expected);
        });
    });
});
//# sourceMappingURL=test-dropWhile.js.map