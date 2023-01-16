/**
 * @module typeOf
 */
const _NaN = 'NaN',
  _Null = 'Null',
  _Undefined = 'Undefined';

/**
 * Fine-grained (efficient) version of `typeof` which returns the incoming value's
 * constructor's name, and or it's type name - Easier to use, and offers a way to
 * perform strict type checking (easily) at run-time;  In the case of incoming `NaN`,
 * `null`, and/or `undefined` values their type names are class cased names equivalent
 * to their values - 'NaN' (for `NaN`), 'Undefined' for `undefined` and 'Null' for
 * `null`.
 */
export function typeOf(value: any): string {
  let retVal;
  if (value === undefined) {
    retVal = _Undefined;
  } else if (value === null) {
    retVal = _Null;
  } else {
    const {name: constructorName} = value.constructor;
    retVal = (
      constructorName === Number.name ||
      constructorName === BigInt.name
    ) && Number.isNaN(value) ?
      _NaN : constructorName;
  }
  return retVal;
}
