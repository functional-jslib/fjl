import {expectEqual, expectError, vowelsArray, vowelsString} from '../helpers';
import {tail} from '../../src/list';
import {Slice} from "../../src";

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
                expect((xs => () => tail(xs as Slice<unknown>))(x)).toThrow(Error)
            );
        expectError(tail);
    });
});
