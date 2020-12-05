import {vowelsArray} from "../helpers";
import {Unary} from "../../src/types";
import {sortOn} from "../../src";

describe('#sortOn', () => {
  const identity = x => x,
    second = <T1, T2>(tuple: [T1, T2]): T2 => tuple[1],
    first = <T1, T2>(tuple: [T1, T2]): T1 => tuple[0],
    vowelsChainRevAssocList =
      vowelsArray.map((c, i, xs) => [c, vowelsArray[vowelsArray.length - i - 1]]);
  (<[Unary<any>, any[], any[]][]>[
    [identity, [2, 3, 1], [3, 2, 1]],
    [identity, [1, 3, 2], [3, 2, 1]],
    [identity, [1, 2, 3], [3, 2, 1]],
    [identity, [3, 2, 1], [3, 2, 1]],
    [identity, [], []],
    [second, vowelsChainRevAssocList, vowelsChainRevAssocList.reverse()],
    [first, vowelsChainRevAssocList.reverse(), vowelsChainRevAssocList],
  ])
    .forEach(([op, xs, expected]) => {
      it(`sortOn(${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = sortOn(op, xs);
        expect(rslt).toEqual(expected);
      });
    });
});
