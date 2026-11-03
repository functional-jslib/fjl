import {isEven, isOdd, randNatNum, randNum, randomNatNumber, randomNumber} from "../../src/number";
import {$normalizeStep, normalizeStepOrThrow} from "../../src/number/normalizeStepOrThrow";

describe('number/', () => {
  describe('#isOdd, #isEven', () => {
    (<[number, boolean][]>[
      [0, false], [1, true], [2, false], [3, true], [-1, true], [-2, false]
    ]).forEach(([x, odd]) => {
      it(`isOdd(${x}) === ${odd}, isEven(${x}) === ${!odd}`, () => {
        expect(isOdd(x)).toEqual(odd);
        expect(isEven(x)).toEqual(!odd);
      });
    });
  });

  describe('#randomNumber', () => {
    it('should default to the range 0 to 1', () => {
      for (let i = 0; i < 100; i += 1) {
        const x = randomNumber();
        expect(x >= 0 && x <= 1).toEqual(true);
      }
    });

    it('should stay within given range', () => {
      for (let i = 0; i < 100; i += 1) {
        const x = randomNumber(5, 7);
        expect(x >= 5 && x <= 7).toEqual(true);
      }
    });

    it('should have an alias', () => {
      expect(randNum).toBe(randomNumber);
    });
  });

  describe('#randomNatNumber', () => {
    it('should return integers within given range', () => {
      for (let i = 0; i < 100; i += 1) {
        const x = randomNatNumber(1, 3);
        expect(Number.isInteger(x) && x >= 1 && x <= 3).toEqual(true);
      }
    });

    it('should have an alias', () => {
      expect(randNatNum).toBe(randomNatNumber);
    });
  });

  describe('#normalizeStepOrThrow', () => {
    (<[number, number, number, number][]>[
      [1, 3, 2, 2],
      [1, 3, -2, 2],
      [3, 1, 2, -2],
      [3, 1, -2, -2],
      [1, 1, 2, 2],
    ]).forEach(([from, to, step, expected]) => {
      it(`normalizeStepOrThrow(${from}, ${to}, ${step}) === ${expected}`, () => {
        expect(normalizeStepOrThrow(from, to, step)).toEqual(expected);
        expect($normalizeStep(from)(to)(step)).toEqual(expected);
      });
    });

    it('should throw on a `0` step', () => {
      expect(() => normalizeStepOrThrow(1, 3, 0)).toThrow('`step` cannot be falsy or `0`');
    });
  });
});
