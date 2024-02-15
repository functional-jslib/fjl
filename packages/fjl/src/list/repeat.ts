export const

  /**
   * Generator that infinitely yields repetitions of `x` as a list;
   *
   * ```javascript
   * const gen = repeat(0);
   * console.log(gen.next().value); // [0]
   * console.log(gen.next().value); // [0, 0]
   * // ...
   * ```
   */
  repeat = function* repeat<T>(x: T): Generator<T[], void> {
    const out = [x];

    while (true) {
      yield out;
      out.push(x);
    }
  }
