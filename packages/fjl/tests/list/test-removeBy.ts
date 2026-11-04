import {alphabetArray, alphabetString, equal, expectEqual, expectError} from "../helpers";
import {init, removeBy, tail} from "../../src";

describe('#removeBy', () => {
  it('should remove the first occurrence of an item in a list.', () => {
    expectEqual(removeBy(equal, 'l', 'hello world'), 'helo world');
    expectEqual((removeBy(equal, 'l', 'hello world'.split('')) as string[]).join(''), 'helo world');
    expectEqual(removeBy(equal, 'a', alphabetString), tail(alphabetString));
    expectEqual(removeBy(equal, 'z', alphabetString), init(alphabetString));
    expectEqual(removeBy(equal, 'a', alphabetArray), tail(alphabetArray));
    expectEqual(removeBy(equal, 'z', alphabetArray), init(alphabetArray));
  });
  it('should match the documented Haskell examples', () => {
    const range1to10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expectEqual(removeBy((a: number, b: number) => a <= b, 4, range1to10), [1, 2, 3, 5, 6, 7, 8, 9, 10]);
    expectEqual(removeBy((a: number, b: number) => a !== b, 5, [5, 5, 4, 3, 5, 2]), [5, 5, 3, 5, 2]);
  });
  it('should return an empty list when receiving an empty list', () => {
    expectEqual(removeBy(equal, 'a', ''), '');
    expectEqual(removeBy(equal, 'a', []), []);
  });
  it('should throw Errors when receiving nothing in the list position', () => {
    expectError(() => removeBy(equal, null, null));
    expectError(() => removeBy(equal, undefined, undefined));
    expectError(() => removeBy(equal, null, null));
    expectError(() => removeBy(equal, undefined, undefined));
  });
});
