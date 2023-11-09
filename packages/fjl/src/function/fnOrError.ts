import {typeOf} from '../object/typeOf';

export const

  /**
   * @deprecated Check for your error in place instead.
   *
   * Returns a function or throws an error if given `f` is not a
   * function.
   */
  fnOrError = <T>(symbolName: string, f: T): T => {
    if (!f || !(f instanceof Function)) {
      throw new Error(`${symbolName} should be a function. ` +
        `Type received: ${typeOf(f)};  Value received: ${f}.`);
    }
    return f;
  },

  /**
   * @deprecated Check for your error in place instead.
   *
   * @param {string} symbolName
   *
   * @throws {Error} if given `f` is not a function.
   *
   * @returns {<T>(f: T) => T}
   */
  $fnOrError = <T>(symbolName: string) => (f: T): T =>
    fnOrError(symbolName, f)

;
