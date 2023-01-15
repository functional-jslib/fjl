import {unzip} from "../../src/list";
import {vowelsArray} from "../helpers";

describe('#unzip', () => {
  (<[[any, any][], ReturnType<typeof unzip>][]>[
    [[], [[], []]],
    [[[]], [[], []]],
    // Create test case tuples
    vowelsArray.reduce((agg, x, i, xs) => {
        const [tuples, partsList] = agg;
        const y = xs[i + 1];

        // If is odd push tuple into list
        if (i % 2 === 0) {
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

  it('should throw on `null`, and/or `undefined`', () => {
    (<Parameters<typeof unzip>[]>[
      [null],
      [undefined],
    ])
      .forEach(([args]) => {
        expect(() => unzip(args)).toThrow();
      });
  });
});
