import {randomNumber} from "./randomNumber";

/**
 * Returns a random natural number, between given `min` and `max` values (inclusive).
 */
export const randomNatNumber = (min = 0, max = 1) =>
    Math.round(randomNumber(min, max)),

  randNatNum = randomNatNumber

;
