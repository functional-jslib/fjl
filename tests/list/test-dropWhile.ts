import {expectEqual, vowelsArray, vowelsString} from "../helpers";
import {dropWhile} from "../../src/list";


describe('#dropWhile', () => {
    it('should drop elements while predicate is fulfilled and vice-versa', () => {
        const alnumRegex = /^[a-z]$/i,
            alnumPred = x => alnumRegex.test(x),
            nonAlnumPred = x => !alnumPred(x),
            getCharCodeLessThan = lessThanCharCode => x => (x + '').charCodeAt(0) < lessThanCharCode
        ;
        [
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
            )
            .forEach(([subj, pred, expected]) => {
                const result = dropWhile(pred, subj);
                expectEqual(result, expected);
            });
    });
});
