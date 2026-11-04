import {mapAccumR} from "../../src/list/mapAccumR";
import {vowelsString} from "../helpers";
import {MapAccumOp} from "../../src";

describe('#mapAccumR', () => {
  type ZeroT = number | string;

  (<[string, MapAccumOp<ZeroT, ZeroT>, string | ZeroT[], ZeroT, [ZeroT, ZeroT[]]][]>[
    ['mapAccumR(multBy2Sums, number, number[]) === [number, number[]]',
      (agg: number, item: number) => {
        const product = item * 2;
        return [agg + product, product];
      },
      [1, 2, 3, 4, 5], 1,
      [31, [2, 4, 6, 8, 10]]
    ],
    ['mapAccumR(charSums, number, string) === [number, number[]]',
      (agg: number, char: string) => {
        const charCode = char.charCodeAt(0);
        return [agg + charCode, charCode];
      },
      vowelsString, 0,
      ((): [number, number[]] => {
        const charCodes = vowelsString.split('').map(xs => xs.charCodeAt(0)),
          charCodesSum = charCodes.reduce((agg, x) => agg + x, 0);
        return [charCodesSum, charCodes];
      })()
    ],
  ])
    .forEach(([testName, op, incoming, zero, expected]) => {
      it(testName, () => {
        const result = mapAccumR(op, zero, incoming);
        expect(result).toEqual(expected);
      });
    });
});

describe('#mapAccumR - Haskell parity', () => {
  it('should thread the accumulator right-to-left, and keep mapped items in input order', () => {
    expect(mapAccumR((a: number, b: number) => [a + b, a], 0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
      .toEqual([55, [54, 52, 49, 45, 40, 34, 27, 19, 10, 0]]);
    expect(mapAccumR((a: string, b: number) => [a + b, a], '0', [1, 2, 3, 4, 5]))
      .toEqual(['054321', ['05432', '0543', '054', '05', '0']]);
  });
});
