import {cycle} from "../../src/list/cycle";
import {repeat} from "../../src/list/repeat";
import {take} from "../../src/list/take";

const {stringify} = JSON;

describe('#cycle', () => {
  (<[string | any[], number, any[]][]>[
    [[42], 3, [42, 42, 42]],
    [[2, 5, 7], 10, [2, 5, 7, 2, 5, 7, 2, 5, 7, 2]],
    ['ab', 3, ['a', 'b', 'a']],
    ['a😀', 3, ['a', '😀', 'a']],
  ])
    .forEach(([xs, n, expected]) => {
      it(`take(${n}, cycle(${stringify(xs)})) === ${stringify(expected)}`, () => {
        expect(take(n, cycle(xs))).toEqual(expected);
      });
    });

  [[], ''].forEach(xs => {
    it(`should throw on first pull, not on call, for \`cycle(${stringify(xs)})\``, () => {
      const gen = cycle(xs as Iterable<any>);
      expect(() => gen.next()).toThrow();
    });

    it(`should only throw when pulled from: \`take(0, cycle(${stringify(xs)}))\``, () => {
      expect(take(0, cycle(xs as Iterable<any>))).toEqual([]);
      expect(() => take(1, cycle(xs as Iterable<any>))).toThrow();
    });
  });

  it('should not see changes made to the array after the first pull', () => {
    const xs = [1, 2],
      gen = cycle(xs);
    gen.next();
    xs[1] = 9;
    expect(gen.next().value).toEqual(2);
  });

  it('should cycle other finite iterables', () => {
    expect(take(5, cycle(new Set([1, 2])))).toEqual([1, 2, 1, 2, 1]);
  });

  it('should be the identity on infinite iterables', () => {
    expect(take(3, cycle(repeat(1)))).toEqual([1, 1, 1]);
  });
});
