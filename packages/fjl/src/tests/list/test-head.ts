import {expectEqual, expectError, vowelsArray, vowelsString} from '../helpers';
import {head} from '../../list/head';

describe('#head', () => {
    it('should return the first item in a list or `undefined` if list is empty.', () => {
        [
            [vowelsString, vowelsString[0]],
            [vowelsArray, vowelsArray[0]],
            [[], undefined],
            ['', undefined]
        ]
            .forEach(([arg, expected]) => {
                expectEqual(head(arg), expected);
            });
    });
    it('should throw an error when no parameter is passed in', () => {
        expectError(head);
        expectError(() => head(null));
    });
});
