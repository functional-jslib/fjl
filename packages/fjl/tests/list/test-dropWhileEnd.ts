import {nonAlphaNumsArray, vowelsArray} from "../helpers";
import {dropWhileEnd} from "../../src/list/dropWhileEnd";
import {id} from "../../src/function/id";
import {UnaryPred} from "../../src/types";

// @todo move test-case message(s) into loop
describe('#dropWhileEnd', () => {
  it('should drop elements while predicate is fulfilled', () => {
    const alnumRegex = /^[a-z]$/i,
      alnumPred: UnaryPred<string> = x => alnumRegex.test(x),
      nonAlnumPred: UnaryPred<string> = x => !alnumPred(x),
      getCharCodeGreaterThan = (greaterThanCharCode): UnaryPred<string> =>
        (x: string): boolean => x.charCodeAt(0) > greaterThanCharCode,
      nonAlnumsAndVowelsArray = nonAlphaNumsArray.concat(vowelsArray),
      vowelsAndNonAlnumsArray = vowelsArray.concat(nonAlphaNumsArray)
    ;
    (<[[UnaryPred<any>, any[]], any[]][]>[
      [[id, []], []],
      [[alnumPred, vowelsArray], []],
      [[nonAlnumPred, vowelsArray], vowelsArray],
      [[nonAlnumPred, nonAlnumsAndVowelsArray], nonAlnumsAndVowelsArray],
      [[nonAlnumPred, vowelsAndNonAlnumsArray], vowelsArray],
    ]
      .concat(
        vowelsArray.map((c, ind) =>
          [[getCharCodeGreaterThan(c.charCodeAt(0)), vowelsArray], vowelsArray.slice(0, ind + 1)]
        ),
      ))
      .forEach(([args, expected]) => {
        const result = dropWhileEnd(args[0], args[1]);
        expect(result).toEqual(expected);
      });
  });
});
