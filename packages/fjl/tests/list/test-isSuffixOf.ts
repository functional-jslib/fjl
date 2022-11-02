import {isSuffixOf} from "../../src/list";
import {vowelsArray} from "../helpers";

describe('#isSuffixOf', () => {
  (<[Parameters<typeof isSuffixOf>, boolean][]>[
    ...vowelsArray.reduceRight((agg, x, i) => {
      agg.push([[vowelsArray, vowelsArray.slice(i, vowelsArray.length)], true]);
      return agg;
    }, [
      [[vowelsArray, ''], false],
    ])
  ])
    .forEach(([[xs1, xs2], expected]) => {
      it(`isSuffixOf(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)}) === ${expected}`, () => {
        const rslt = isSuffixOf(xs1, xs2);
        expect(rslt).toEqual(expected);
      });
    });
});
