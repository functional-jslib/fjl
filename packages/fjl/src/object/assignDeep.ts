import {containsEnumerables, isPrimitive} from './is';

export const

  /**
   * Merges all objects down into one (takes two or more args).
   */
  assignDeep = (obj0: any, ...objs: any[]): any => {
    if (!obj0) return obj0;

    return objs.reduce((topAgg, obj) => {
      if (!obj) return topAgg;

      return Object.keys(obj).reduce((agg, key) => {
        const propDescriptor = Object.getOwnPropertyDescriptor(agg, key);

        // If property being visited is not settable, skip it
        if (propDescriptor && (
          propDescriptor.writable === false || (
            !propDescriptor.writable &&
            !propDescriptor.set
          )
        )) {
          return agg;
        }

        const existingValue = agg[key],
          value = obj[key];

        // If LHV is not a primitive, and RHV contains enumerables then values are assignable
        if (!isPrimitive(existingValue) && containsEnumerables(value))
          assignDeep(existingValue, value);
        else
          agg[key] = value;

        return agg;
      }, topAgg);

    }, obj0);
  },

  /**
   * Curried version of `assignDeep`.
   *
   * @todo **Known bug** - the rest-args are forwarded as a single array
   *  (`assignDeep(obj0, objs)` instead of `assignDeep(obj0, ...objs)`), so
   *  `$assignDeep(a)(b, c)` merges the *array* `[b, c]` into `a` (producing
   *  `{0: b, 1: c, ...a}`) rather than `b` and `c` themselves.  `$objUnion`
   *  aliases this method and inherits the bug.  Pinned by `it.failing` cases
   *  in `tests/test-currying.ts` (see issue #124) - remove those when fixed.
   */
  $assignDeep = (obj0: any) => (...objs: any[]) => assignDeep(obj0, objs)

;
