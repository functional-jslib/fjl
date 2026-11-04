import {repeat} from "../../src/list/repeat";
import {take} from "../../src/list/take";

describe('#repeat', () => {
  (<[number, number, number[]][]>[
    [17, 3, [17, 17, 17]],
    [17, 0, []],
    [0, 4, [0, 0, 0, 0]],
  ]).forEach(([x, n, expected]) => {
    it(`take(${n}, repeat(${x})) === ${JSON.stringify(expected)}`, () => {
      expect(take(n, repeat(x))).toEqual(expected);
    });
  });

  it('should yield the item itself, not a list of it', () => {
    const x = {};
    expect(repeat(x).next().value).toBe(x);
  });
});
