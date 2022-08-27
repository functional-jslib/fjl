import {expectLength, expectTrue, vowelsArray} from "../helpers";
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
      if (n <= 0) {
        return 0;
      }
      let lastPermutes = 1,
        i = 1;
      while (i <= n) {
        lastPermutes = i * lastPermutes;
        i += 1;
      }
      return lastPermutes;
    };

  it('Should return unique permutations for a given set of items', () => {
    const lists =
      vowelsArray.reduceRight((agg, _, ind, list) =>
          agg.concat([list.slice(ind)]),
        []
      );

    // Test initial `lists`

    expect(lists).toHaveLength(vowelsArray.length);

    // Tests initial lists' length
    lists.forEach(
      (xs, ind) => expect(xs).toHaveLength(ind + 1)
    );

    // Test permutations uniqueness, and number
    lists.forEach(xs => {
      const result = permutations(xs);
      expect(areAllPermutesUnique(result)).toEqual(true)
      expect(howManyPermutes(xs.length)).toEqual(result.length);
    });
  });
});
