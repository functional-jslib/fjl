import {$iterate, iterate} from "../../src/list/iterate";
import {take} from "../../src/list/take";

describe('#iterate', () => {
  it('should yield `x`, `op(x)`, `op(op(x))`, etc.', () => {
    expect(take(10, iterate((x: number) => x + 3, 42)))
      .toEqual([42, 45, 48, 51, 54, 57, 60, 63, 66, 69]);
    expect(take(10, iterate((x: boolean) => !x, true)))
      .toEqual([true, false, true, false, true, false, true, false, true, false]);
    expect(take(4, iterate((x: number) => x, 1))).toEqual([1, 1, 1, 1]);
  });

  it('should not call `op` for items that aren\'t pulled', () => {
    let calls = 0;
    const op = (x: number) => {
      calls += 1;
      return x + 1;
    };
    expect(take(3, iterate(op, 0))).toEqual([0, 1, 2]);
    expect(calls).toEqual(2);
  });

  it('should be curried via `$iterate`', () => {
    expect(take(2, $iterate((x: number) => x + 1)(0))).toEqual([0, 1]);
  });
});
