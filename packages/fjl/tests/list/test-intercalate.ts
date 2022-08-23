import {intercalate} from "../../src/list/intercalate";
import {alphabetArray} from "../helpers";

const {stringify} = JSON;

describe('#intercalate', () => {
  type Intercalate = typeof intercalate;
  const charArrayArray = alphabetArray.map(x => [x]);
  (<[Parameters<Intercalate>, ReturnType<Intercalate>][]>[
    [[',', charArrayArray], charArrayArray.map(xs => xs[0]).join(',').split('')],
    [[[','], charArrayArray], charArrayArray.map(xs => xs[0]).join(',').split('')],
    [[',', ['a']], 'a'],
    [[[','], ['a']], 'a'],
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
