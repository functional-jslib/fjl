import {all} from "./all";
import {isFalsy} from "../boolean";

export const
  /**
   * Returns a boolean indicating whether all items in container are 'falsy' or not.
   * **Note** The haskell type for this function only takes two items, but here
   * we allow the passing of more than one item (may change later to adhere to the haskell type).
   */
  not = <T>(xs: T[]): boolean => all(isFalsy, xs) as boolean;
