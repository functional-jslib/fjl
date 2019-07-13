import {alphabetArray, alphabetString, expectEqual} from "../helpers";
import {intersperse} from "../../src/list/intersperse";

describe('#intersperse', () => {
    it('should be able to inject a list (string or array) in-between the items of a list of the same type.', () => {
        expectEqual(intersperse(',', alphabetString), alphabetArray.join(','));
        expectEqual(intersperse(',', alphabetArray), alphabetArray.join(',').split(''));
    });
    it('should return a list with the same item when the list has a length of `1`', () => {
        expectEqual(intersperse(', ', ['a']), ['a']);
        expectEqual(intersperse(', ', 'a'), 'a');
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(intersperse('', []), []);
        expectEqual(intersperse('', ''), '');
    });
});
