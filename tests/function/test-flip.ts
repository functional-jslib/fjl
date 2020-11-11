import {expectEqual, expectFunction, subtract} from '../helpers';
import {flip, flip3, flip4, flip5, flipN} from '../../packages/function';

describe ('#flip', function () {
    it ('should be a function', function () {
        expectFunction(flip);
    });
    it ('should return a function', function () {
        // @ts-ignore
        expectFunction(flip());
        expectFunction(flip(subtract));
    });
    it ('should return a function which executes its params in reverse.', function () {
        const subtractor = flip(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(2, 1), subtractor(1, 2));
        expectEqual(subtract(1, 2), subtractor(2, 1));
    });
});

describe ('#flipN', function () {
    it ('should be a function', function () {
        expectFunction(flipN);
    });
    it ('should return a function', function () {
        // @ts-ignore
        expectFunction(flipN());
        expectFunction(flipN(subtract));
    });
    it ('should return a function which executes its params in reverse.', function () {
        const subtractor = flipN(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(3, 2, 1), subtractor(1, 2, 3));
        expectEqual(subtract(1, 2, 3), subtractor(3, 2, 1));
    });
});

describe ('#flip3', function () {
    it ('should be a function', function () {
        expectFunction(flip3);
    });
    it ('should return a function', function () {
        // @ts-ignore
        expectFunction(flip3());
        expectFunction(flip3(subtract));
    });
    it ('should return a function which executes its params in reverse.', function () {
        const subtractor = flip3(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(3, 2, 1), subtractor(1, 2, 3));
        expectEqual(subtract(1, 2, 3), subtractor(3, 2, 1));
    });
});

describe ('#flip4', function () {
    it ('should be a function', function () {
        expectFunction(flip4);
    });
    it ('should return a function', function () {
        // @ts-ignore
        expectFunction(flip4());
        expectFunction(flip4(subtract));
    });
    it ('should return a function which executes its params in reverse.', function () {
        const subtractor = flip4(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(4, 3, 2, 1), subtractor(1, 2, 3, 4));
        expectEqual(subtract(1, 2, 3, 4), subtractor(4, 3, 2, 1));
    });
});

describe ('#flip5', function () {
    it ('should be a function', function () {
        expectFunction(flip5);
    });
    it ('should return a function', function () {
        // @ts-ignore
        expectFunction(flip5());
        expectFunction(flip5(subtract));
    });
    it ('should return a function which executes its params in reverse.', function () {
        const subtractor = flip5(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(5, 4, 3, 2, 1), subtractor(1, 2, 3, 4, 5));
        expectEqual(subtract(1, 2, 3, 4, 5), subtractor(5, 4, 3, 2, 1));
    });
});
