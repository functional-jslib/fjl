import {expectError, vowelsArray} from '../helpers';
import {concat} from '../../src/list/concat';

describe('#concat', () => {
    const
        arg1 = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
        arg2 = ['abc', 'def', 'ghi'],
        arg3 = [vowelsArray, vowelsArray, vowelsArray];
    [
        [[], []],
        [['', '', ''], ''],
        [[[], [], []], []],
        [arg1, [].concat.apply([], arg1)],
        [arg2, ''.concat.apply('', arg2)],
        [arg3, [].concat.apply([], arg3)]
    ]
        .forEach(([arg, expected]) => {
            it(`concat( ${JSON.stringify(arg)} ) === ${JSON.stringify(expected)}`, () => {
                expect(concat(arg)).toEqual(expected);
            });
        });

    it('should throw an error when receiving nothing', () => {
        expectError(concat);
        expectError(() => concat(null));
        expectError(() => concat(undefined));
    });
});
