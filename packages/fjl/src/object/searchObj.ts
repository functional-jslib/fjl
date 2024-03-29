import {notNullish} from './is';

export const

  /**
   * @recommendation Use optional chaining (all?.your?.base, etc.),
   * and/or value coalescing (`(all?.your?.base ?? {})`, etc.) instead
   * - This method can still be used, however the language contains
   * idiomatic ways of achieving the same functionality.
   *
   * Gives you value at key/namespace-key within `obj`;  E.g.,
   * searchObj('all.your.base', {all: {your: {base: 99}}}) === 99 // `true`
   *
   * @note If key is unreachable (undefined) returns `undefined`.
   *  Useful in cases where we do not want to check each key along the way before getting/checking value;  E.g.,
   *
   * @example
   * ```
   * if (obj && obj.all && obj.all.your && obj.all.your.base) {
   *   // Thing we want to do
   * }
   *
   * // With `searchObj`:
   * if (searchObj('all.your.base', obj)) {
   *   // Thing we want to do
   * }
   * ```
   */
  searchObj = <T>(nsString: string, obj: T): any => {
    if (!obj) {
      return obj;
    }
    if (nsString.indexOf('.') === -1) {
      return obj[nsString];
    }
    const parts = nsString.split('.'),
      limit = parts.length;
    let ind = 0,
      parent = obj;
    for (; ind < limit; ind += 1) {
      const node = parent[parts[ind]];
      if (notNullish(node)) {
        return node;
      }
      parent = node;
    }
    return parent;
  },

  $searchObj = <T>(nsString: string) =>
    (obj: T): any => searchObj(nsString, obj)

;
