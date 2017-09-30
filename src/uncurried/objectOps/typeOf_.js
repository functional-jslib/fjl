/**
 * Created by elyde on 12/18/2016.
 * @memberOf objectOps_
 */
const _Number = Number.name,
    _NaN = 'NaN',
    _Null = 'Null',
    _Undefined = 'Undefined',
    _undefined = 'undefined';

/**
 * Returns the class name of an object from it's class stringOps.
 * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
 * @function module:fjl.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name property if not null or undefined (in which case a
 *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
 */
export function typeOf (value) {
    let retVal;
    if (typeof value === _undefined) {
        retVal = _Undefined;
    }
    else if (value === null) {
        retVal = _Null;
    }
    else {
        let constructorName = (value).constructor.name;
        retVal = constructorName === _Number && isNaN(value) ?
            _NaN : constructorName;
    }
    return retVal;
}
