// @todo remove library methods as testing utilities here (namely 'reverse').
import {vowelsArray, vowelsString} from "../helpers";
import {Foldr1, foldr1} from "../../src/list/foldr1";
import {id} from "../../src";

const {stringify} = JSON;

describe('#foldr1', () => {
  const times2 = x => x * 2,
    idAggArray = <T>(agg: T[], x: T) => {
      agg.push(x);
      return agg;
    },
    idAggPlus = (agg, x) => agg + x,
    nums1To5 = '12345'.split('').map(x => parseInt(x, 10));

  (<[Parameters<Foldr1>, ReturnType<Foldr1>][]>[
    [[id, []], []],
    [[id, ''], ''],
    [[times2, nums1To5], nums1To5.map(times2).reverse()],
    [[id, vowelsString], vowelsString[vowelsString.length - 1]],
    [[idAggArray, vowelsArray], vowelsArray.slice(0).reverse()],
    [[idAggPlus, vowelsString], vowelsArray.slice(0).reverse().join('')],
    [[idAggPlus, nums1To5], 15],
  ])
    .forEach(([args, expected]) => {
      it(`foldr1(${args.map(arg => stringify(arg)).join(', ')}) === ` +
        `${stringify(expected)}`, function () {
        const result = foldr1(...args);
        expect(result).toEqual(expected);
      });
    });
});
