/**
 * Internal helpers for list methods that work item by item and give back the type of list
 * they were given.  Not re-exported from `./index`.
 */

/**
 * The list type a method gives back: `string` for strings, and the same array type for arrays.
 */
export type ListOf<TS> = TS extends string ? string : TS;

export const

  /**
   * Returns a new array of a list's items, walking strings by code point so a surrogate
   * pair stays one item.
   */
  toItems = <TS extends string | any[]>(xs: TS): TS[number][] => [...xs] as TS[number][],

  /**
   * Returns `items` as the same type of list as `like`.
   */
  fromItems = <TS extends string | any[]>(like: TS, items: TS[number][]): ListOf<TS> =>
    (typeof like === 'string' ? items.join('') : items) as ListOf<TS>

;
