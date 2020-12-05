import {negateF} from "../function";

export const isEven = (x: number) => x % 2 === 0,

  isOdd = negateF(isEven)

;
