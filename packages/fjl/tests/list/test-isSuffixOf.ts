import {isSuffixOf} from "../../src/list";
import {Slice} from "../../src/types/data";
import {vowelsArray, vowelsString} from "../helpers";

describe('#isSuffixOf', () => {
  (<[Slice<any>, Slice<any>, boolean][]>[
    ...vowelsArray.reduceRight((agg, x, i) => {
      agg.push([vowelsString, vowelsString.substring(i, vowelsString.length), true]);
      agg.push([vowelsArray, vowelsArray.slice(i, vowelsArray.length), true]);
      return agg;
    }, [
      [vowelsString, '', false],
      [vowelsArray, '', false],
    ] as [Slice<any>, Slice<any>, boolean][])
  ])
    .forEach(([xs1, xs2, expected]) => {
      it(`isSuffixOf(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)}) === ${expected}`, () => {
        const rslt = isSuffixOf(xs1, xs2);
        expect(rslt).toEqual(expected);
      });
    });
});
