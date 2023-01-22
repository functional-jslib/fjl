import {mapAccumL} from "../../src/list/mapAccumL";
import {vowelsArray} from "../helpers";

describe('#mapAccumL', () => {
  (<[
    string,
    Parameters<typeof mapAccumL>,
    ReturnType<typeof mapAccumL>
  ][]>[
    ['mapAccumL(multBy2Sums, number, number[]) === [number, number[]]',
      [(agg: number, item: number) => {
        const product = item * 2;
        return [agg + product, product];
      },
        1,
        [1, 2, 3, 4, 5]
      ],
      [31, [2, 4, 6, 8, 10]]
    ],
    ['mapAccumL(charSums, number, string) === [number, number[]]',
      [(agg: number, char: string) => {
        const charCode = char.charCodeAt(0);
        return [agg + charCode, charCode];
      },
        0,
        vowelsArray
      ],
      ((): [number, number[]] => {
        const charCodes = vowelsArray.map(xs => xs.charCodeAt(0)),
          charCodesSum = charCodes.reduce((agg, x) => agg + x, 0);
        return [charCodesSum, charCodes];
      })()
    ],
  ])
    .forEach(([testName, args, expected]) => {
      it(testName, () => {
        const result = mapAccumL(...args);
        expect(result).toEqual(expected);
      });
    });
});
