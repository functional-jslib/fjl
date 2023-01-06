import {alphabetArray, vowelsArray} from "../helpers";
import {sliceFrom} from "../../src/list/utils/sliceFrom";
import {$sliceFrom} from "../../src/list";

describe('#sliceFrom', () => {
  it('should be curried', () => {
    vowelsArray
      .map((_, ind) => $sliceFrom(ind))
      .forEach((fn, ind) => {
        const result = fn(vowelsArray);
        // Compare slices
        expect(result).toEqual(vowelsArray.slice(ind, vowelsArray.length)); // deep equal

        // Compare lengths (calculated)
        expect(vowelsArray.length - ind).toEqual(result.length);
      });
  });

  it('should create a slice of an array "from" given index.', () => {
    alphabetArray.forEach((_, ind, list) => {
      const result = sliceFrom(ind, list);

      // Compare slices
      expect(result).toEqual(list.slice(ind, list.length)); // deep equal

      // Compare lengths (calculated)
      expect(alphabetArray.length - ind).toEqual(result.length);
    });
  });

  it('should return an empty slice when given an empty slice', () => {
    expect(sliceFrom(99, [])).toEqual([]);
  });

  it('should throw an error when not receiving a `ListLike` (a sliceable, an array, and/or string).', () => {
    [null, undefined, {}, false, 0].forEach((x: any) => {
      expect(() => sliceFrom(99, x)).toThrow(Error);
    });
  });
});
