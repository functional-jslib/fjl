import {alphabetArray, alphabetString, expectEqual} from "../helpers";
import {intersperse} from "../../src/list/intersperse";
import {Slice} from "../../src/types/data";

describe('#intersperse', () => {
    it('should be able to inject a list (string or array) in-between the items of a list of the same type.', () => {
        expectEqual(intersperse(',', alphabetString as unknown as Slice<string>), alphabetArray.join(',')); // @todo type conversion cleanup
        expectEqual(intersperse(',', alphabetArray), alphabetArray.join(',').split(''));
    });
    it('should return a list with the same item when the list has a length of `1`', () => {
        expectEqual(intersperse(', ', ['a']), ['a']);
        expectEqual(intersperse(', ', 'a' as unknown as Slice<string>), 'a'); // @todo type conversion cleanup
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(intersperse('', []), []);
        expectEqual(intersperse('', '' as unknown as Slice<string>), ''); // @todo type conversion cleanup
    });
});
