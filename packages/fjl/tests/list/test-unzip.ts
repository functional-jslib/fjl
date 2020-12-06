import {unzip} from "../../src/list";
import {vowelsArray} from "../helpers";
import {isEven} from "../../src/number";

describe('#unzip', () => {
  (<[[any, any][], [any[], any[]]][]>[
    [[], [[], []]],
    [[[]], [[], []]],
    vowelsArray.concat(['y']).reduce((agg, x, i, xs) => {
        const [tuples, partsList] = agg;

        // If is odd push tuple into list
        if (!isEven(i)) {
          tuples.push([xs[i - 1], x]);
        }

        // Push part
        partsList[isEven(i) ? 0 : 1].push(x);

        return agg;
      },
      [[], [[], []]] as [
        [any, any][],
        [any[], any[]]
      ]
    )
  ])
    .forEach(([tuples, expected]) => {
      it(`unzip(${JSON.stringify(tuples)} === ${JSON.stringify(expected)}`, () => {
        const rslt = unzip(tuples);
        expect(rslt).toEqual(expected);
      });
    });

  it('should throw an error when passed in arg is `null` or `undefined`', () => {
    expect(() => unzip(undefined)).toThrow(Error);
    expect(() => unzip(null)).toThrow(Error);
  });
});
