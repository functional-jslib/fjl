import {typeOf} from '../object/typeOf';

export const

  /**
   * Returns a function or throws an error if given `f` is not a function.
   * @deprecated Check for your error in place instead.
   */
  fnOrError = <T>(symbolName: string, f: T): T => {
    if (!f || !(f instanceof Function)) {
      throw new Error(`${symbolName} should be a function. ` +
        `Type received: ${typeOf(f)};  Value received: ${f}.`);
    }
    return f;
  },

  $fnOrError = <T>(symbolName: string) => (f: T): T =>
    fnOrError(symbolName, f)

;
