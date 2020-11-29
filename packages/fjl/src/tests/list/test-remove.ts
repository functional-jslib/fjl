import {alphabetArray, alphabetString, expectEqual, expectError} from "../helpers";
import {init, remove, tail} from "../../list";

describe('#remove', () => { // same as `delete` (in haskell)
    it('should remove the first occurrence of an item in a list.', () => {
        expectEqual(remove('l', 'hello world'), 'helo world');
        expectEqual(remove('l', 'hello world'.split('')).join(''), 'helo world');
        expectEqual(remove('a', alphabetString), tail(alphabetString));
        expectEqual(remove('z', alphabetString), init(alphabetString));
        expectEqual(remove('a', alphabetArray), tail(alphabetArray));
        expectEqual(remove('z', alphabetArray), init(alphabetArray));
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(remove('a', ''), '');
        expectEqual(remove('a', []), []);
    });
    it('should throw Errors when receiving nothing in the list position', () => {
        expectError(() => remove(null, null));
        expectError(() => remove(undefined, undefined));
        expectError(() => remove(null, null));
        expectError(() => remove(undefined, undefined));
    });
});

