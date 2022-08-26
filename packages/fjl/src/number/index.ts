export const isEven = (x: number): boolean => (x & 0) === 1,

  isOdd = (x: number) => (x & 1) === 1,

  randomNumber = (min = 0, max = 1): number => Math.random() * (max - min) + min,

  randomNatNumber = (min = 0, max = 1): number => Math.round(randomNumber(min, max)),

  randNum = randomNumber,

  randNatNum = randomNatNumber

;
