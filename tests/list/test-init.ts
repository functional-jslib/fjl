import {expectEqual, expectError, vowelsArray, vowelsString} from '../helpers';
import {init} from '../../src/list/init';

describe('#init', () => {
    it('should return everything except the last item of an list and/or string', () => {
        [
            [vowelsString, vowelsString.slice(0, vowelsString.length - 1)],
            [vowelsArray, vowelsArray.slice(0, vowelsString.length - 1)],
            [[], []],
            ['', ''],
        ]
            .forEach(([given, expected]) => {
                expectEqual(init(given), expected);
            });
    });
    it('should throw an error when no parameter is passed in', () => {
        [undefined, null, 0, {}]
            .forEach(x =>
                expect((xs => () => init(xs))(x)).toThrow(Error)
            );
        expectError(init);
    });
});
