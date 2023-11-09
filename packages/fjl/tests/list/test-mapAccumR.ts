import {mapAccumR} from "../../src/list/mapAccumR";
import {vowelsString} from "../helpers";
import {MapAccumOp, Slice} from "../../src";

describe('#mapAccumR', () => {
  type ZeroT = number | string;

  (<[string, MapAccumOp<ZeroT, ZeroT>, Slice<ZeroT>, ZeroT, [ZeroT, Slice<ZeroT>]][]>[
    ['mapAccumR(multBy2Sums, number, number[]) === [number, number[]]',
      (agg: number, item: number) => {
        const product = item * 2;
        return [agg + product, product];
      },
      [1, 2, 3, 4, 5], 1,
      [31, [10, 8, 6, 4, 2]]
    ],
    ['mapAccumR(charSums, number, string) === [number, number[]]',
      (agg: number, char: string) => {
        const charCode = char.charCodeAt(0);
        return [agg + charCode, charCode];
      },
      vowelsString, 0,
      ((): [number, number[]] => {
        const charCodes = vowelsString.split('').reverse().map(xs => xs.charCodeAt(0)),
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
