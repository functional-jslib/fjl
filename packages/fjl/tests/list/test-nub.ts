import {alphabetArray, expectEqual, expectError} from "../helpers";
import {map, nub} from "../../src/list";

describe('#nub', () => {
  it('should remove all but first occurrences of repeat items in a list.', () => {
    expectEqual(nub('conundrum'.split('')), 'conudrm'.split(''));
    expectEqual(nub(map((char: string) => char + char, alphabetArray).join('').split('')), alphabetArray);
  });
  it('should return a copy of the passed in list with items intact if there ' +
    'aren\'t any repeat items', () => {
    expectEqual(nub(alphabetArray), alphabetArray);
  });
  it('should return empty lists when receiving empty lists', () => {
    expectEqual(nub([]), []);
  });
  it('should match the documented Haskell examples', () => {
    expectEqual(nub([1, 2, 3, 4, 3, 2, 1, 2, 4, 3, 5]), [1, 2, 3, 4, 5]);
    expectEqual(nub('hello, world!'), 'helo, wrd!');
    expectEqual(nub(''), '');
  });
  it('should keep surrogate pairs whole', () => {
    expectEqual(nub('😀😁😀'), '😀😁');
  });
  it('should throw Errors when receiving nothing', () => {
    expectError(() => nub(null));
    expectError(() => nub(undefined));
  });
});
