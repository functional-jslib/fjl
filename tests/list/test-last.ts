import {expectEqual, expectError, vowelsArray, vowelsString} from '../helpers';
import {last} from '../../src/list/last';

describe('#last', () => {
    it('should return the last item in a list or `undefined` if list is empty.', () => {
        [
            [vowelsString, vowelsString[vowelsString.length - 1]],
            [vowelsArray, vowelsArray[vowelsArray.length - 1]],
            [[], undefined],
            ['', undefined]
        ]
            .forEach(([arg, expected]) => {
                expectEqual(last(arg), expected);
            });
    });
    it('should throw an error when no parameter is passed in', () => {
        expectError(last);
        expectError(() => last(null));
    });
});
