import {negateF} from "../function";

export const isEven = (x: number): boolean => x % 2 === 0,

  isOdd = negateF(isEven),

  randomNumber = (min = 0, max = 1): number => Math.random() * (max - min) + min,

  randomNatNumber = (min = 0, max = 1): number => Math.round(randomNumber(min, max))

;
