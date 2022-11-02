import {vowelsArray} from "../helpers";
import {dropWhile} from '../../src/list/dropWhile';
import {UnaryPred} from "../../src/types";

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
  (<Array<[any[], UnaryPred<any>, any[]]>>[
    [vowelsArray, alnumPred, []],
    [vowelsArray, nonAlnumPred, vowelsArray],
  ]
    .concat(
      vowelsArray.map((c, ind) =>
        [vowelsArray, getCharCodeLessThan(c.charCodeAt(0)), vowelsArray.slice(ind)]
      ),
    ))
    .forEach(([subj, pred, expected]) => {
      const testCaseName = `dropWhile(${pred.name}, ${subj}) === ${expected}`;
      it(testCaseName, () => {
        const result = dropWhile(pred, subj);
        expect(result).toEqual(expected);
      });
    });
});
