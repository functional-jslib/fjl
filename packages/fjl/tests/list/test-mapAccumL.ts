import {mapAccumL} from "../../src/list/mapAccumL";
import {Slice} from "../../src/platform";
import {MapAccumFunc} from "../../src";
import {vowelsString} from "../helpers";

describe('#mapAccumL', () => {
  const stringOp = (agg, item) => String.fromCharCode(item.charCodeAt(0) + 1);

  type ZeroT = number | string;

  (<[string, MapAccumFunc<ZeroT, ZeroT>, Slice<ZeroT>, ZeroT, [ZeroT, Slice<ZeroT>]][]>[
    ['mapAccumL(multBy2Sums, number, number[]) === [number, number[]]',
      (agg: number, item: number) => {
        const product = item * 2;
        return [agg + product, product];
      },
      [1, 2, 3, 4, 5], 1,
      [31, [2, 4, 6, 8, 10]]
    ],
    ['mapAccumL(charSums, number, string) === [number, number[]]',
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
        const result = mapAccumL(op, zero, incoming);
        expect(result).toEqual(expected);
      });
    });
});
