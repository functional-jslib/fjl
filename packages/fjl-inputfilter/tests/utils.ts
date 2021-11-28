import {range} from 'fjl';
import {TypeRef} from "../../fjl/src";

export const

  genRan = (min: number, max: number) => Math.round(Math.random() * max),

  genRanChar = (min = 0, max = 0x10FFFF) =>
    String.fromCharCode(genRan(min, max)),

  genRanStr = (min = 0, max = 100) =>
    range(min, max)
      .reduce(str => str + genRanChar(min, max), ''),

  runHasPropOfType = (Type: TypeRef, propName: string, [correctValue, incorrectValue]: [any, any], x: any): void => {
    test(`it should have an \`${propName}\` property`, () => {
      expect(Object.prototype.hasOwnProperty.call(x, propName)).toEqual(true);
    });
    test(`it should throw an error when setting \`${propName}\` to ${incorrectValue}`, () => {
      expect(() => {
        x[propName] = incorrectValue;
      }).toThrow(Error);
    });
    test(`it should set value correctly for \`${propName}\` when value is of correct type`, () => {
      x[propName] = correctValue;
      expect(x[propName]).toEqual(correctValue);
    });
  },

  runHasPropOfTypeUnWrapped = (Type, propName, [correctValue, incorrectValue], x) => {
    expect(Object.prototype.hasOwnProperty.call(x, propName)).toEqual(true);
    expect(() => {
      x[propName] = incorrectValue;
    }).toThrow(Error);
    x[propName] = correctValue;
    expect(x[propName]).toEqual(correctValue);
  };

type RunHasPropOfType = typeof runHasPropOfType;
type RunHasPropOfTypesUnWrapped = typeof runHasPropOfTypeUnWrapped;
type P = Parameters<RunHasPropOfType>;
type P2 = Parameters<RunHasPropOfTypesUnWrapped>;

export const runHasPropTypes = (propTypeArgsList: [P[0], P[1], P[2]][], x) =>
    propTypeArgsList.forEach(args => runHasPropOfType(...(args.concat([x]) as P))),

  runHasPropTypesUnWrapped = (propTypeArgsList: [P2[0], P2[1], P2[2]][], x) =>
    propTypeArgsList.forEach(args => runHasPropOfTypeUnWrapped(...(args.concat([x])) as P2))

;
