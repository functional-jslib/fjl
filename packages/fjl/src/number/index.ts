import {negateF} from "../function";

export const isEven = (x: number): boolean => x % 2 === 0,

  isOdd = negateF(isEven)

;
