import {vowelsArray} from '../helpers';
import {unconsr} from '../../src/list/unconsr';

describe('#unconsr', () => {
  (<[any[], any[] | any][]>[
    [[], undefined],
    [null, undefined],
    [undefined, undefined],
    [false, undefined],
    [0, undefined],
    ['', undefined],
    [['a'], [[], 'a']],
    [vowelsArray, [vowelsArray.slice(0, vowelsArray.length - 1), vowelsArray[vowelsArray.length - 1]]],
  ])
    .forEach(([xs, expected]) => {
      it(`unconsr(${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
        // console.log(xs);
        expect(unconsr(xs)).toEqual(expected);
      });
    });
});
