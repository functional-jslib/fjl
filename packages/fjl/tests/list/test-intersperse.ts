import {alphabetArray} from "../helpers";
import {intersperse} from "../../src/list/intersperse";

describe('#intersperse', () => {
  type Intersperse = typeof intersperse;
  (<[Parameters<Intersperse>, ReturnType<Intersperse>][]>[
    [[',', alphabetArray], alphabetArray.join(',').split('')],
    [[',', ['a']], ['a']],
    [['', []], []],
    [['', ''], ''],
    [['a', []], []],
    [['a', ''], ''],
    [[[','], alphabetArray],
      alphabetArray.flatMap((x, i) =>
        i !== 0 ? [[','], x] : [x])
    ],
    [[[','], ['a']], ['a']],
    [[[''], []], []],
    [[[''], ''], ''],
    [[['a'], []], []],
    [[['a'], ''], ''],
  ])
    .forEach(([args, expected]) => {
      it('', () => {
        const rslt = intersperse(...args);
        expect(rslt).toEqual(expected);
      });
    });
});
