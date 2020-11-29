import {alphabetArray, equal, expectEqual, expectError} from "../helpers";
import {map, nubBy} from "../../src/list";

describe('#nubBy', () => {
    it('should remove all but first occurrences of repeat items in a list.', () => {
        expectEqual(nubBy(equal, 'conundrum'.split('')), 'conudrm'.split(''));
        expectEqual(nubBy(equal, map(char => char + char, alphabetArray).join('').split('')), alphabetArray);
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
