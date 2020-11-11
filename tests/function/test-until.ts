import {expectEqual, expectError, expectFunction} from '../helpers';
import {until} from '../../packages/function/until';

describe ('#until', function () {
    it ('should be a function', function () {
        expectFunction(until);
    });

    it ('should run while predicate returns `false`', function () {
        const result = until(x => x >= 100, x => { return x + x; }, 1);
        expectEqual(result, 128);
        // log('Result:', result);
    });

    it ('should throw an error when no predicate is passed in', function () {
        expectError(
            () => until(null, x => { return x + x; }, 1)
        );
    });

    it ('should throw an error when no operation is passed in', function () {
        expectError(
            () => until(x => x >= 100, null, 1)
        );
    });
});
