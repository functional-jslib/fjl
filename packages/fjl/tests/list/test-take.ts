import {vowelsArray} from "../helpers";
import {$take, take} from "../../src/list/take";

const {stringify} = JSON;

describe('#take, #$take', () => {
  type TakeTest = [[number, string | any[]], string | any[]];
  type TakeTestCases = Array<TakeTest>;
  (<TakeTestCases>[
    [[0, []], []],
    [[1, []], []],
  ]).concat(
    (<TakeTestCases>vowelsArray.map((_, ind) => [
      [ind, vowelsArray],
      vowelsArray.slice(0, ind)
    ])),
  )
    .forEach(([args, expected]) => {
      it(`take(${stringify(args)}) === ${stringify(expected)}`, () => {
        expect(take(...args)).toEqual(expected);
        expect($take(args[0])(args[1])).toEqual(expected);
      });
    });

  [null, undefined, 0, {}].forEach(x => {
    it(`should throw an error when: \`take(3, ${x + ''})\``, () => {
      expect(() => take(3, x as Iterable<any>)).toThrow()
      expect(() => $take(3)(x as Iterable<any>)).toThrow()
    })
  });
});

describe('#take - laziness', () => {
  const countPulls = () => {
    const state = {pulls: 0},
      gen = (function* () {
        while (true) {
          state.pulls += 1;
          yield state.pulls;
        }
      })();
    return {state, gen};
  };

  [0, 1, 2, 5].forEach(n => {
    it(`should pull exactly ${n} item(s) for \`take(${n}, gen)\``, () => {
      const {state, gen} = countPulls();
      expect(take(n, gen).length).toEqual(n);
      expect(state.pulls).toEqual(n);
    });
  });

  it('should not pull anything for a negative count', () => {
    const {state, gen} = countPulls();
    expect(take(-1, gen)).toEqual([]);
    expect(state.pulls).toEqual(0);
  });

  it('should not read `xs` at all for a count of `0`, as in Haskell', () => {
    expect(take(0, null as unknown as Iterable<any>)).toEqual([]);
  });

  it('should close the generator it reads from', () => {
    const {gen} = countPulls();
    take(1, gen);
    expect(gen.next().done).toEqual(true);
  });
});
