import {Unary} from "../types";

export const

  /**
   * Iterates `f`, `n - 1` number of times (first with `x`, then with the result of the previous call to `f`), and  returns `x`, and the results of calls to `f`, in a list.
   */
  iterate = <T>(n: number, op: Unary<T>, x: T): T[] => {
    let ind = 0,
      lastX: T = x;
    const out: T[] = [lastX];
    for (; ind < n - 1; ind += 1) {
      lastX = op(lastX);
      out.push(lastX);
    }
    return out;
  },

  $iterate = <T>(n: number) =>
    (op: Unary<T>) =>
      (x: T): T[] => iterate(n, op, x),

  /**
   * Generates a generator which yields the result of calling operator with last yielded result (on first call last
   * yielded result is incoming `x` value).
   */
  genIterator = <T>(op: Unary<T, T>, x: T): () => Generator<T, void, T> => function* () {
    let lastX = x;
    yield lastX;
    while (true) {
      lastX = op(lastX);
      yield lastX;
    }
  },

  $genIterator = <T>(op: Unary<T, T>) =>
    (x: T): () => Generator<T, void, T> => genIterator(op, x)

;

