/**
 * Returns a random number, between given `min` and `max` values (inclusive).
 */
export const randomNumber = (min = 0, max = 1) =>
    Math.random() * (max - min) + min,

  randNum = randomNumber

;
