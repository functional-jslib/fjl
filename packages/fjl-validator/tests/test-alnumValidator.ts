/**
 * Created by elyde on 1/15/2016.
 */
import {alnumValidator} from '../src/alnumValidator';

describe('alnumValidator', function () {
  type AlnumValidator = typeof alnumValidator;

  (<[boolean, Parameters<AlnumValidator>[0]][]>[
    [true, 'helloworld'],
    [true, 'testingtesting123testingtesting123'],
    [true, 'sallysellsseashellsdownbytheseashore'],
    [false, 'hello[]world'],
    [false, '99 bottles of beer on the wall']
  ])
    .forEach(([expected, arg]) => {
      test(`alnumValidator({})(${JSON.stringify(arg)}) === ${expected}`, function () {
        const validator = alnumValidator({}),
          {result, messages} = validator(arg);
        expect(result).toEqual(expected);
        expect(messages.length).toEqual(!expected ? 1 : 0);
      });
    });

});
