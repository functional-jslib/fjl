import {cycle} from "../../src";
import {vowelsArray} from "../helpers";

describe('#cycle', () => {
  (<[Parameters<typeof cycle>, ReturnType<typeof cycle>][]>[]
      .concat(
        [].fill(null, 0, 5)
          .map((_, i) => new Array(i)
            .fill(vowelsArray.slice(0, i), 0, i)
            .flatMap(xs => xs)
          )
      )
  )
    .forEach(([args, expected]) => {
      it(`cycle(${args.map(x => JSON.stringify(x)).join(', ')}) === ` +
        `${JSON.stringify(expected)}`, () => {
        const result = cycle(...args);
        expect(result).toEqual(expected);
      });
    });

});
