/**
 * @module typeOf
 */
const _NaN = 'NaN',
  _Null = 'Null',
  _Undefined = 'Undefined';

/**
 * Version of `typeof` which returns given value's type name, e.g., Constructor name,
 * 'Undefined', 'Null', and/or 'NaN' (for 'NaN' values), based on given value.
 */
export function typeOf(value: any): string {
  if (value === undefined) {
    return  _Undefined;
  } else if (value === null) {
    return  _Null;
  } else {
    const {name: constructorName} = value.constructor;
    return (
      constructorName === Number.name ||
      constructorName === BigInt.name
    ) && Number.isNaN(value) ?
      _NaN : constructorName;
  }
}
