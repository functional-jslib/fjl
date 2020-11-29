import {alphabetArray, expectEqual, expectError} from "../helpers";
import {map, nub} from "../../src/list";

describe('#nub', () => {
    it('should remove all but first occurrences of repeat items in a list.', () => {
        expectEqual(nub('conundrum'.split('')), 'conudrm'.split(''));
        expectEqual(nub(map(char => char + char, alphabetArray).join('').split('')), alphabetArray);
    });
    it('should return a copy of the passed in list with items intact if there ' +
        'aren\'t any repeat items', () => {
        expectEqual(nub(alphabetArray), alphabetArray);
    });
    it('should return empty lists when receiving empty lists', () => {
        expectEqual(nub([]), []);
    });
    it('should throw Errors when receiving nothing', () => {
        expectError(() => nub(null));
        expectError(() => nub(undefined));
    });
});