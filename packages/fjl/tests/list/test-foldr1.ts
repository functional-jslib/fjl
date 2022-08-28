// @todo remove library methods as testing utilities here (namely 'reverse').
import {vowelsArray, vowelsString} from "../helpers";
import {Foldr1, foldr1} from "../../src/list/foldr1";
import {id} from "../../src";

const {stringify} = JSON;

describe('#foldr1', () => {
  const times2 = x => x * 2,
    aggTimes2 = (agg, x, i, xs): number[] => {
      const result = i === xs.length - 1 ? agg.map(times2).concat(x.map(times2)) : agg.concat(x.map(times2));
      console.log(xs, result);
      return result
    },
    idAggArray = <T>(agg: T[], xs: T[]) => agg.concat(...xs),
    idAggPlus = (agg, x) => agg + x,
    nums1To5 = '12345'.split('').map(x => parseInt(x, 10));

  (<[Parameters<Foldr1>, ReturnType<Foldr1>][]>[
    [[id, []], undefined],
    [[id, ''], undefined],
    [[aggTimes2, nums1To5.map(n => [n])], nums1To5.map(n => n * 2).reverse()],
    [[id, vowelsString], vowelsString[vowelsString.length - 1]],
    [[idAggArray, vowelsArray.map(x => [x])], vowelsArray.slice(0).reverse()],
    [[idAggPlus, vowelsString], vowelsArray.slice(0).reverse().join('')],
    [[idAggPlus, nums1To5], 15],
  ])
    .forEach(([args, expected]) => {
      it(`foldr1(${args[0].name}, ${stringify(args[1])}) === ` +
        `${stringify(expected)}`, function () {
        const result = foldr1(...args);
        expect(result).toEqual(expected);
      });
    });
});
