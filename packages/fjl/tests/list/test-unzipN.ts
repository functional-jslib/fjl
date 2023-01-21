import {unzipN} from "../../src/list/unzipN";
import {vowelsArray} from "../helpers";

const {stringify} = JSON;

describe('#unzipN', () => {
  (<[[any, any][], ReturnType<typeof unzipN>][]>[
    [[], []],
    [[[]], []],
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
      it(`unzipN(${stringify(tuples)} === ${stringify(expected)}`, () => {
        const rslt = unzipN(tuples);
        expect(rslt).toEqual(expected);
      });
    });
});
