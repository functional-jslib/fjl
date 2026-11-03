/**
 * Shared helpers for asserting that the library's `$`-prefixed methods are
 * actually curried.
 *
 * `fjl` uses "idiomatic" currying (see #40) - a curried method applies one
 * argument group per call (`f(a)(b)(c)`), it does *not* accept an arbitrary
 * argument tuple per call (`f(a, b)(c)`), which is what the (deprecated)
 * `curry*` family in `src/function/curry.ts` does.  The assertions below are
 * written against the idiomatic form.
 *
 * @see https://github.com/functional-jslib/fjl/issues/124
 */

export type AnyFn = (...args: any[]) => any;

/**
 * Produces a *fresh* argument list for one invocation - a factory (instead of
 * a literal list) so methods that mutate their arguments (`push`, `pushN`,
 * `defineProp`, etc.) get clean arguments for every call we make.
 */
export type ArgsFactory = () => any[];

export interface CurryCase {
  /** Arguments, in the un-curried sibling's argument order. */
  args: ArgsFactory;

  /**
   * Number of arguments consumed by each application, e.g., `[1, 2]` means
   * `f(a)(b, c)`.  Must sum to `args().length`.  Defaults to one argument per
   * application (`[1, 1, ...]`).
   */
  groups?: number[];

  /**
   * Maps a raw return value (and the arguments it was produced from) into
   * something comparable via `expect(...).toEqual(...)`;  Required for methods
   * returning functions/generators, or communicating via side effects.
   */
  finalize?: (result: any, args: any[]) => any;

  /** Optional label, used in the generated test name. */
  label?: string;
}

export interface CurrySpec {
  /** Un-curried sibling's export name, when it isn't the `$`-name sans `$`. */
  sibling?: string;

  /**
   * Explicit un-curried counterpart;  Overrides the `sibling` lookup - for the
   * few methods whose un-curried equivalent requires some assembly.
   */
  uncurried?: AnyFn;

  /** At least one case is required. */
  cases: CurryCase[];

  /**
   * Set to `false` where the method mutates its *first* argument group - a
   * re-used partial can't be expected to be pure, in that case.
   */
  reusablePartial?: boolean;

  /**
   * Set (with a reason) where the method is known to *fail* the assertions;
   * Generated cases are then registered via `it.failing`, which fails the
   * suite if/when the method starts passing (so the note can't go stale).
   */
  knownFailure?: string;

  /**
   * Set (with a reason) where the `$`-prefixed method is verifiably *not*
   * curried;  Only the "agrees with un-curried sibling" assertion is then
   * meaningful, and an extra test pins the (documented) non-curried arity.
   */
  notCurried?: string;
}

export type CurryRegistry = Record<string, CurrySpec>;

export const

  /** One argument per application. */
  defaultGroups = (len: number): number[] => new Array(len).fill(1),

  sum = (xs: number[]): number => xs.reduce((a, b) => a + b, 0),

  /**
   * Applies `args` to `f`, `groups` at a time, and returns the final result;
   * `groups` is expected to align with the head of `args`.
   */
  applyInGroups = (f: AnyFn, args: any[], groups: number[]): any => {
    let offset = 0,
      received: any = f;
    groups.forEach(size => {
      received = (received as AnyFn)(...args.slice(offset, offset + size));
      offset += size;
    });
    return received;
  },

  /** Renders `f(_)(_, _)` style test names. */
  curriedCallSignature = (name: string, groups: number[]): string =>
    `${name}${groups.map(size =>
      `(${new Array(size).fill('_').join(', ')})`).join('')}`,

  /**
   * Asserts that `curried` is an idiomatically curried counterpart of
   * `uncurried`, for one argument case:
   *
   * 1. Every application before the last one returns a function.
   * 2. Fully applied, `curried` agrees with `uncurried`.
   * 3. A partially applied `curried` is re-usable - currying yields a new
   *    function per application, so the partial must not be consumed by, or
   *    carry state over from, a prior completion.
   */
  assertCurriedCase = (
    curried: AnyFn,
    uncurried: AnyFn,
    _case: CurryCase,
    reusablePartial = true
  ): void => {
    const finalize = _case.finalize ?? ((x: any) => x),
      expectedArgs = _case.args(),
      groups = _case.groups ?? defaultGroups(expectedArgs.length);

    // Guard against mis-specified fixtures
    expect(sum(groups)).toEqual(expectedArgs.length);
    expect(typeof curried).toEqual('function');
    expect(typeof uncurried).toEqual('function');

    const expected = finalize(uncurried(...expectedArgs), expectedArgs);

    // 1. + 2.
    const args = _case.args();
    let offset = 0,
      received: any = curried;

    groups.forEach((size, ind) => {
      // Not fully applied yet - must (still) be a function
      expect(typeof received).toEqual('function');
      received = (received as AnyFn)(...args.slice(offset, offset + size));
      offset += size;
      if (ind < groups.length - 1) {
        // Called with fewer than all argument groups - must return a function
        expect(typeof received).toEqual('function');
      }
    });

    expect(finalize(received, args)).toEqual(expected);

    // 3.
    if (!reusablePartial || groups.length < 2) return;

    const headArgs = _case.args(),
      head = headArgs.slice(0, groups[0]),
      tailGroups = groups.slice(1),
      partial = curried(...head) as AnyFn;

    expect(typeof partial).toEqual('function');

    [0, 1].forEach(() => {
      const tail = _case.args().slice(groups[0]),
        result = applyInGroups(partial, tail, tailGroups);
      expect(finalize(result, head.concat(tail))).toEqual(expected);
    });
  }

;
