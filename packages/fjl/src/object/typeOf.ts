/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */
const _Number = Number.name,
    _NaN = 'NaN',
    _Null = 'Null',
    _Undefined = 'Undefined';

/**
 * Returns the constructor/class/type name of a value.
 * @note For `NaN`, `null`, and `undefined` we return their names classed case;
 * 'NaN' (for `NaN`), 'Undefined' for `undefined` and 'Null' for `null`.
 * @function module:object.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name or derived name (in the case of `null`, `undefined`, or `NaN` (whose
 *  normalized names are 'Null', 'Undefined', 'NaN' respectively).
 */
export function typeOf (value: any): string {
    let retVal;
    if (value === undefined) {
        retVal = _Undefined;
    }
    else if (value === null) {
        retVal = _Null;
    }
    else {
        const {name: constructorName} = (value).constructor;
        retVal = constructorName === _Number && isNaN(value) ?
            _NaN : constructorName;
    }
    return retVal;
}
