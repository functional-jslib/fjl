import {isTruthy} from "../boolean";
import {any} from "./any";

export const

  /**
   * Returns a boolean indicating whether any item in container is 'truthy' or not.
   * **Note** The haskell type for this function only takes two items, but here
   * we allow the passing of more than one item (may change later to adhere to the haskell type).
   */
  or = <T>(xs: T[]): boolean => any(isTruthy, xs);
