import {includes} from "../_platform/slice";

/**
 * The opposite of `elem` - Returns a boolean indicating whether
 * an element doesn't exist in given list.
 */
export const notElem = <T>(x: T, xs: string | T[]): boolean => !includes(x, xs);
