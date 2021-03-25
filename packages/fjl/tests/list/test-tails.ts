import {tails} from "../../src/list/tails";

describe('#tails', () => {
  /**
   * should unfold a list into list of all possible
   * non-omitting sequential sets that start with the last item.
   */
  (<[string, string | string[], (string | string[])[]][]>[
    [`tails('abc') === ['abc', 'bc', 'c', '']`, 'abc', ['abc', 'bc', 'c', '']],
    [`tails('abc'.split('')) === ['abc'.split(''), 'bc'.split(''), ['c'], []]`, 'abc'.split(''),
      ['abc'.split(''), 'bc'.split(''), ['c'], []]],
  ])
    .forEach(([testName, arg, expected]) => {
      it(testName, function () {
        const rslt = tails(arg);
        expect(rslt).toEqual(expected);
      });
    });
});
