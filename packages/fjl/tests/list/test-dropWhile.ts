import {vowelsArray} from "../helpers";
import {$dropWhile, dropWhile} from '../../src/list/dropWhile';
import {UnaryPred} from "../../src/types";

describe('#dropWhile, #$dropWhile', () => {
  const alnumRegex = /^[a-z]$/i,
    alnumPred = (x: any): boolean => alnumRegex.test(x),
    nonAlnumPred = (x: any): boolean => !alnumPred(x),
    getCharCodeLessThan = (lessThanCharCode: any): UnaryPred<any> => {
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
        expect($dropWhile(pred)(subj)).toEqual(expected);
      });
    });

  [null, undefined, 0, {}].forEach(x =>
    it(`should throw an error when: \`dropWhile(() => null, ${x + ''})\``, () => {
      expect(() => dropWhile(() => null, x as Iterable<any>)).toThrow()
      expect(() => $dropWhile(() => null)(x as Iterable<any>)).toThrow()
    })
  );
});
