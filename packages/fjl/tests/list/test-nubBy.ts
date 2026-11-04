import {alphabetArray, equal, expectEqual, expectError} from "../helpers";
import {map, nubBy} from "../../src";

describe('#nubBy', () => {
  it('should remove all but first occurrences of repeat items in a list.', () => {
    expectEqual(nubBy(equal, 'conundrum'.split('')), 'conudrm'.split(''));
    expectEqual(nubBy(equal, map((char: string) => char + char, alphabetArray).join('').split('')), alphabetArray);
  });
  it('should return a copy of the passed in list with items intact if there ' +
    'aren\'t any repeat items', () => {
    expectEqual(nubBy(equal, alphabetArray), alphabetArray);
  });
  it('should return empty lists when receiving empty lists', () => {
    expectEqual(nubBy(equal, []), []);
  });
  it('should throw Errors when receiving nothing', () => {
    expectError(() => nubBy(equal, null));
    expectError(() => nubBy(equal, undefined));
  });
});

describe('#nubBy - Haskell parity', () => {
  it('should give back a string for a string', () => {
    expectEqual(nubBy(equal, 'conundrum'), 'conudrm');
  });
  it('should call the predicate as `pred(keptItem, item)`', () => {
    expectEqual(nubBy((x: number, y: number) => x % 3 === y % 3, [1, 2, 4, 5, 6]), [1, 2, 6]);
    expectEqual(nubBy((a: number, b: number) => a !== b, [2, 7, 1, 8, 2, 8, 1, 8, 2, 8]), [2, 2, 2]);
    expectEqual(nubBy((a: number, b: number) => a > b, [1, 2, 3, 2, 1, 5, 4, 5, 3, 2]), [1, 2, 3, 5, 5]);
  });
});
