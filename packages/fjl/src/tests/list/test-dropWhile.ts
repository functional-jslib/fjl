import {expectEqual, vowelsArray, vowelsString} from "../helpers";
import {dropWhile} from '../../list/dropWhile';
import {SliceOf} from "../../platform/slice";
import {UnaryPred} from "../../types";

describe('#dropWhile', () => {
    const alnumRegex = /^[a-z]$/i,
        alnumPred = (x): boolean => alnumRegex.test(x),
        nonAlnumPred = (x): boolean => !alnumPred(x),
        getCharCodeLessThan = (lessThanCharCode): UnaryPred<any> => {
            const methodName = `charCodeLessThan${lessThanCharCode}`;
            return {
                [methodName]: (x): boolean => (x + '').charCodeAt(0) < lessThanCharCode
            }[methodName];
        }
    ;
    (<Array<[SliceOf<any>, UnaryPred<any>, SliceOf<any>]>>[
        [vowelsArray, alnumPred, []],
        [vowelsString, alnumPred, ''],
        [vowelsArray, nonAlnumPred, vowelsArray],
        [vowelsString, nonAlnumPred, vowelsString],
    ]
        .concat(
            vowelsArray.map((c, ind) =>
                [vowelsArray, getCharCodeLessThan(c.charCodeAt(0)), vowelsArray.slice(ind)]
            ),
            vowelsString.split('').map((c, ind) =>
                [vowelsString, getCharCodeLessThan(c.charCodeAt(0)), vowelsString.slice(ind)]
            )
        ))
        .forEach(([subj, pred, expected]) => {
            const testCaseName = `dropWhile(${pred.name}, ${subj}) === ${expected}`;
            it(testCaseName, () => {
                const result = dropWhile(pred, subj);
                expectEqual(result, expected);
            });
        });
});
