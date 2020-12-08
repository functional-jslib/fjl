import {isSuffixOf} from "../../src/list";
import {SliceOf} from "../../src/platform/slice";
import {vowelsArray, vowelsString} from "../helpers";

describe('#isSuffixOf', () => {
  (<[SliceOf<any>, SliceOf<any>, boolean][]>[
    ...vowelsArray.reduceRight((agg, x, i) => {
      agg.push([vowelsString, vowelsString.substring(i, vowelsString.length), true]);
      agg.push([vowelsArray, vowelsArray.slice(i, vowelsArray.length), true]);
      return agg;
    }, [
      [vowelsString, '', false],
      [vowelsArray, '', false],
    ] as [SliceOf<any>, SliceOf<any>, boolean][])
  ])
    .forEach(([xs1, xs2, expected]) => {
      it(`isSuffixOf(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)}) === ${expected}`, () => {
        const rslt = isSuffixOf(xs1, xs2);
        expect(rslt).toEqual(expected);
      });
    });
});
