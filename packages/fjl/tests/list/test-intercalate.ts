import {intercalate} from "../../src/list/intercalate";
import {vowelsArray, vowelsString} from "../helpers";

const {stringify} = JSON;

describe('#intercalate', () => {
  type Intercalate = typeof intercalate;
  const vowelsArrayArray = vowelsArray.map(x => [x]),
    vowelsStringWithCommas = vowelsArray.join(','),
    vowelsArrayWithCommas = vowelsArray.flatMap((x, i) => i > 0 ? [',', x] : [x])
  ;
  (<[Parameters<Intercalate>, ReturnType<Intercalate>][]>[
    [[',', vowelsArray], vowelsStringWithCommas],
    [[[','], vowelsArrayArray], vowelsArrayWithCommas],
    [[',', vowelsString], vowelsStringWithCommas],
    [[',', ['a']], 'a'],
    [[[','], ['a']], 'a'],
    [['', vowelsString], vowelsString],
    [['', vowelsArray], vowelsString],
    [['', ''], ''],
    [['', []], []],
    [['', [[]]], []],
    [[[''], []], []],
    [[[''], [[]]], []]
  ])
    .forEach(([args, expected]) => {
      it(`intercalate(${args.map(arg => stringify(arg)).join(', ')}) === ${stringify(expected)}`, () => {
        const rslt = intercalate(...args);
        expect(rslt).toEqual(expected);
      });
    });
});
