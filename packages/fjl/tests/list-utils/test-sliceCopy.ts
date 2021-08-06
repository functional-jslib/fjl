import {alphabetArray, alphabetString, vowelsArray, vowelsString} from "../helpers";
import {sliceCopy} from "../../src";
import {Slice} from "../../src/platform";

describe('#sliceCopy', () => {
  it('should return a copy of given slice', () => {
    [[], vowelsArray, alphabetArray]
      .map(x => [x, sliceCopy(x)])
      .forEach(([original, result]) => {
        expect(result).toEqual(original); // deep equal
        expect(result !== original).toEqual(true); // strict check
      });

    // String variant
    (<Slice<string>[]>['', vowelsString, alphabetString])
      .map(x => [x, sliceCopy(x)])
      .forEach(([original, result]) => {
        expect(result).toEqual(original);
      });
  });
  it('should throw an error when receiving non `ListLike` value (non-(string|array|slicable))', () => {
    [null, undefined, {}, () => undefined].forEach(x => {
      expect(() => sliceCopy(x as Slice)).toThrow(Error);
    });
  });
});
