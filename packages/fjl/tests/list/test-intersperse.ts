import {alphabetArray, vowelsArray} from "../helpers";
import {intersperse} from "../../src/list/intersperse";

describe('#intersperse', () => {
  type Intersperse = typeof intersperse;
  (<[Parameters<Intersperse>, ReturnType<Intersperse>][]>[
    [[',', ['a']], ['a']],
    [['', []], []],
    [['a', []], []],
    [['*', vowelsArray], vowelsArray.join('*').split('')],
    [[['*'], vowelsArray],
      vowelsArray.flatMap((x, i) =>
        i !== 0 ? [['*'], x] : [x])
    ],
    [[[','], ['a']], ['a']],
    [[[''], []], []],
    [[['a'], []], []],
  ])
    .forEach(([args, expected]) => {
      it(`intersperse(${JSON.stringify(args)} === ${JSON.stringify(expected)}`, () => {
        const rslt = intersperse(...args);
        expect(rslt).toEqual(expected);
      });
    });
});
