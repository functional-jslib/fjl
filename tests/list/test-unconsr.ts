import {vowelsArray, vowelsString} from '../helpers';
import {unconsr} from '../../packages/list/unconsr';

describe('#unconsr', () => {
    [
        [[], undefined],
        [null, undefined],
        [undefined, undefined],
        [false, undefined],
        [0, undefined],
        ['', undefined],
        ['a', ['a', '']],
        [['a'], [['a'], []]],
        [vowelsString, [vowelsString.slice(0, vowelsString.length - 1), vowelsString[vowelsString.length - 1]]],
        [vowelsArray, [vowelsArray.slice(0, vowelsArray.length - 1), vowelsArray[vowelsArray.length - 1]]],
    ]
        .forEach(([arg, expected]) => {
            it(`unconsr(${JSON.stringify(arg)}) === ${JSON.stringify(expected)}`, () => {
                console.log(arg);
                expect(unconsr(arg)).toEqual(expected);
            });
        });
});
