import {vowelsArray} from "../helpers";
import {Unary} from "../../src/types";
import {sortOn} from "../../src";

describe('#sortOn', () => {
  const identity = x => x,
    second = <T1, T2>(tuple: [T1, T2]): T2 => tuple[1],
    first = <T1, T2>(tuple: [T1, T2]): T1 => tuple[0],
    vowelsChainRevAssocList =
      vowelsArray.map((c, i, xs) => [c, vowelsArray[vowelsArray.length - i - 1]]),
    reversedVowelsChainRevAssocList = vowelsChainRevAssocList.slice(0).reverse();

  (<[Unary<any>, any[], any[]][]>[
    [identity, [2, 3, 1], [1, 2, 3]],
    [identity, [1, 3, 2], [1, 2, 3]],
    [identity, [1, 2, 3], [1, 2, 3]],
    [identity, [3, 2, 1], [1, 2, 3]],
    [identity, [], []],
    [second, vowelsChainRevAssocList, reversedVowelsChainRevAssocList],
    [first, reversedVowelsChainRevAssocList, vowelsChainRevAssocList],
  ])
    .forEach(([op, xs, expected]) => {
      it(`sortOn(${op}, ${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = sortOn(op, xs);
        expect(rslt).toEqual(expected);
      });
    });
});
