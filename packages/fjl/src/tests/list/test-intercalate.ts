import {intercalate} from "../../list/intercalate";
import {alphabetArray, expectEqual} from "../helpers";

describe('#intercalate', () => {
    it('should intercalate a list within another list and then perform concat on the result', () => {
        const result1 = intercalate(', ', alphabetArray);
        expectEqual(result1, alphabetArray.join(', '));
    });
    it('should return a list with the same item when the list has a length of `1`', () => {
        expect(intercalate(', ', [['a']])).toEqual(['a']); // Ensure list is flattened one level
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(intercalate('', []), []);
        expectEqual(intercalate('', [[]]), []); // Ensures list is flattened one level
    });
});
