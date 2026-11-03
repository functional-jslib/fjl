/**
 * Behaviours pinned by the #122 review, for methods not covered directly elsewhere.
 */
import {
  $getErrorIfNotTypesThrower, $getErrorIfNotTypeThrower, ErrorMessageCtx, getErrorIfNotTypesThrower,
  getErrorIfNotTypesThrowerCurried, getErrorIfNotTypeThrower, getErrorIfNotTypeThrowerCurried
} from "../../src/errorThrowing";

describe('errorThrowing/ behaviour review', () => {
  const toMessage = ({contextName, valueName, foundTypeName, messageSuffix}: ErrorMessageCtx): string =>
    `${contextName}.${valueName}:${foundTypeName}:${messageSuffix}`;

  describe('#getErrorIfNotTypeThrower', () => {
    const thrower = getErrorIfNotTypeThrower<unknown>(toMessage);

    it('should return value on a type match', () => {
      expect(thrower(Number, 'ctx', 'x', 1)).toEqual(1);
    });

    it('should throw using the given message call', () => {
      expect(() => thrower(Number, 'ctx', 'x', 'a', 'suffix')).toThrow('ctx.x:String:suffix');
    });

    it('should use the given type checker', () => {
      const anything = getErrorIfNotTypeThrower<unknown>(toMessage, () => true);
      expect(anything(Number, 'ctx', 'x', 'a')).toEqual('a');
    });
  });

  describe('#getErrorIfNotTypesThrower', () => {
    const thrower = getErrorIfNotTypesThrower<unknown>(toMessage);

    it('should return value when one type matches', () => {
      expect(thrower([String, Number], 'ctx', 'x', 1)).toEqual(1);
    });

    it('should throw when no types match', () => {
      expect(() => thrower([String, Number], 'ctx', 'x', true, 'suffix'))
        .toThrow('ctx.x:Boolean:suffix');
    });
  });

  describe('curried throwers', () => {
    [getErrorIfNotTypeThrowerCurried, $getErrorIfNotTypeThrower].forEach(getThrower => {
      it('should check a single type', () => {
        const thrower = getThrower<unknown>(toMessage)(Number)('ctx')('x');
        expect(thrower(1)).toEqual(1);
        expect(() => thrower('a', 'suffix')).toThrow('ctx.x:String:suffix');
      });
    });

    [getErrorIfNotTypesThrowerCurried, $getErrorIfNotTypesThrower].forEach(getThrower => {
      it('should check multiple types', () => {
        const thrower = getThrower<unknown>(toMessage)([String, Number])('ctx')('x');
        expect(thrower(1)).toEqual(1);
        expect(() => thrower(true, 'suffix')).toThrow('ctx.x:Boolean:suffix');
      });
    });
  });
});
