import {vowelsArray} from "../helpers";
import {permutations} from "../../src/list/permutations";

describe('#permutations', () => {
  const areAllPermutesUnique = permutes => {
      const xs = permutes,
        limit = xs.length;
      for (let i = 0; i < limit; i += 1) {
        const str = xs[i].join('');
        for (let j = 0; j < limit; j += 1) {
          if (j !== i && xs[j].join('') === str) {
            return false;
          }
        }
      }
      return true;
    },

    howManyPermutes = n => {
      if (n <= 0) return 0;
      if (n === 1) return 1;
      let lastPermutes = 1,
        i = 1;
      while (i++ < n) {
        lastPermutes = i * lastPermutes;
      }
      return lastPermutes;
    };

  type ExpectedPermutationCount = number;

  (<[Parameters<typeof permutations>, ExpectedPermutationCount][]>

      // Generate permutation arguments, and expected permutation count
      vowelsArray.reduceRight((agg, _, ind, list) => {
        const newList = list.slice(ind);
        agg.push([[newList], howManyPermutes(list.length - ind)]);
        return agg;
      }, [])
  )
    .forEach(([[xs], expectedPermutesCount], ind) => {
      it(`permutations(${JSON.stringify(xs)}).length === ${expectedPermutesCount}`, () => {
        // Tests initial lists' length
        expect(xs).toHaveLength(ind + 1)

        // Test permutations' uniqueness', and count
        const result = permutations(xs);
        expect(areAllPermutesUnique(result)).toEqual(true)
        expect(result.length).toEqual(expectedPermutesCount);
      });
    });

});
