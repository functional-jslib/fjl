import {expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";
import {reverse} from "../../list/reverse";

describe('#reverse', () => {
    it('should reverse a list passed in.', () => {
        expectEqual(reverse(vowelsString), vowelsString.split('').reverse().join(''));
        expectEqual(reverse(vowelsArray), vowelsArray.slice(0).reverse());
    });
    it('should return an empty list when receiving an empty list', () => {
        expectEqual(reverse([]), []);
        expectEqual(reverse(''), '');
    });
    it('should throw an error when receiving no value', () => {
        expectError(reverse);
        expectError(() => reverse(undefined));
        expectError(() => reverse(null));
    });
});
