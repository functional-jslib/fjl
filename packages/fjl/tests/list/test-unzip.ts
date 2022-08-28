import {unzip} from "../../src/list";
import {vowelsArray} from "../helpers";
import {isEven} from "../../src/number";

describe('#unzip', () => {
  (<[[any, any][], ReturnType<typeof unzip>][]>[
    [[], [[], []]],
    [[[]], [[], []]],
    // Create test case tuples
    vowelsArray.reduce((agg, x, i, xs) => {
        const [tuples, partsList] = agg;
        const y = xs[i + 1];

        // If is odd push tuple into list
        if (isEven(i)) {
          tuples.push([x, y]);
          // Push unzipped parts
          partsList[0].push(x);
          partsList[1].push(y);
        }


        return agg;
      },
      [[], [[], []]] as [
        [any, any][],
        [any[], any[]]
      ]
    )
  ])
    .forEach(([tuples, expected]) => {
      it(`unzip(${JSON.stringify(tuples)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = unzip(tuples);
        expect(rslt).toEqual(expected);
      });
    });

  it('should throw an error when passed in arg is `null` or `undefined`', () => {
    expect(() => unzip(undefined)).toThrow();
    expect(() => unzip(null)).toThrow();
  });
});
