import {expectEqual, expectError, vowelsArray, vowelsString} from '../helpers';
import {tail} from '../../packages/list';

describe('#tail', () => {
    it('should return everything except the last item of an list', () => {
        [
            [vowelsString, vowelsString.slice(1)],
            [vowelsArray, vowelsArray.slice(1)],
            [[], []],
            ['', ''],
        ]
            .forEach(([given, expected]) => {
                expectEqual(tail(given), expected);
            });
    });
    it('should throw an error when no parameter is passed in', () => {
        [undefined, null, 0, {}]
            .forEach(x =>
                expect((xs => () => tail(xs))(x)).toThrow(Error)
            );
        expectError(tail);
    });
});
