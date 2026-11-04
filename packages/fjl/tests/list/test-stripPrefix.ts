import {vowelsArray, vowelsString} from "../helpers";
import {stripPrefix} from "../../src/list/stripPrefix";

const {stringify} = JSON;

describe('#stripPrefix', () => {
  type StripPrefix = typeof stripPrefix;

  (<[Parameters<StripPrefix>, ReturnType<StripPrefix>][]>[
    [['aei', vowelsString], vowelsString.slice(3)],
    [['#!*', vowelsString], vowelsString],
    [['aei'.split(''), vowelsArray], vowelsArray.slice(3)],
    [['#!*'.split(''), vowelsArray], vowelsArray],
    [[vowelsString, vowelsString], ''],
    [[vowelsArray, vowelsArray], []],
    [['', vowelsString], vowelsString],
    [[[], vowelsArray], vowelsArray],
  ])
    .forEach(([args, expected]) => {
      it(`stripPrefix(...${stringify(args)}) === ${stringify(expected)}`, function () {
        const rslt = stripPrefix(...args);
        expect(rslt).toEqual(expected);
      });
    });

  it('should return a list that lacks the prefix unchanged, unlike Haskell\'s `Nothing`', () => {
    expect(stripPrefix('foo', 'barfoo')).toEqual('barfoo');
    expect(stripPrefix('foo', 'foobar')).toEqual('bar');
    expect(stripPrefix('foo', 'foo')).toEqual('');
  });
});
