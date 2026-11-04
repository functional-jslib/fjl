import {concat, removeFirstsBy, splitAt} from "../../src";
import {alphabetArray, alphabetString, equal, expectEqual, vowelsArray, vowelsString} from "../helpers";

describe('#removeFirstsBy', () => {
  const
    consonants = removeFirstsBy(equal, alphabetString, vowelsString),
    consonantsArray = consonants.split('')
  ;
  it('should remove all first occurrences of items in second list matching predicate.', () => {
    // Remove from first entry on both
    const
      fiveArrays = vowelsArray.map(() => alphabetArray),
      catedArrays: string[] = [].concat(...fiveArrays),

      // Expected concated arrays
      expected = vowelsArray.reduce((agg, vowel) => {
        // Pluck item out of array
        // ----
        // Split at concated array at `vowel` index
        const parts = splitAt(agg.indexOf(vowel), agg);

        // Put split parts back together again
        return [].concat(parts[0], parts[1].slice(1));

      }, catedArrays),

      // Remove all first occurrences of `vowels`
      rslt = removeFirstsBy(equal, concat(fiveArrays), vowelsArray);

    // Check results
    expectEqual(rslt, expected);
  });
  it('should match the documented Haskell examples', () => {
    const range1to10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expectEqual(removeFirstsBy((a: number, b: number) => a > b, range1to10, [3, 4, 5]), [4, 5, 6, 7, 8, 9, 10]);
    expectEqual(removeFirstsBy((a: number, b: number) => a !== b, range1to10, [1, 3, 5]), [4, 5, 6, 7, 8, 9, 10]);
  });
  it('should return copy of original list when no items from second list are found in it.', () => {
    expectEqual(removeFirstsBy(equal, consonants, vowelsString), consonants);
    expectEqual(removeFirstsBy(equal, consonantsArray, vowelsArray), consonantsArray);
  });
});
