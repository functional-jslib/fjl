import {alphabetArray, alphabetString, equal, expectEqual, expectError} from "../helpers";
import {init, removeBy, tail} from "../../packages/list";

describe('#removeBy', () => {
    it('should remove the first occurrence of an item in a list.', () => {
        expectEqual(removeBy(equal, 'l', 'hello world'), 'helo world');
        expectEqual(removeBy(equal, 'l', 'hello world'.split('')).join(''), 'helo world');
        expectEqual(removeBy(equal, 'a', alphabetString), tail(alphabetString));
        expectEqual(removeBy(equal, 'z', alphabetString), init(alphabetString));
        expectEqual(removeBy(equal, 'a', alphabetArray), tail(alphabetArray));
        expectEqual(removeBy(equal, 'z', alphabetArray), init(alphabetArray));
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

