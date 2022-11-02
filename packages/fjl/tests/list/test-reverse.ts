import {expectEqual, expectError, vowelsArray} from "../helpers";
import {reverse} from "../../src/list/reverse";

describe('#reverse', () => {
    it('should reverse a list passed in.', () => {
        expectEqual(reverse(vowelsArray), vowelsArray.slice(0).reverse());
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(reverse([]), []);
    });
    it('should throw an error when receiving no value', () => {
        expectError(reverse);
        expectError(() => reverse(undefined));
        expectError(() => reverse(null));
    });
});
