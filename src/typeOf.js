/**
 * Created by elyde on 12/18/2016.
 */

let _Number = Number.name,
    _NaN = 'NaN',
    _Null = 'Null',
    _Undefined = 'Undefined',
     _undefined = 'undefined';

/**
 * Returns the class name of an object from it's class string.
 * @note Returns 'NaN' if value type is 'Number' and value isNaN evaluates to true as of version 0.4.85.
 * @note If your type (constructor/class) overrides it's `toString` method use a named `toString` method to get the accurate constructor name out of `typeOf`;  E.g., If you do override `toString` on your class(es) and don't set them to named functions then `sjl.typeOf*` will use Object.prototype.toString to pull your classes type out.
 * @function module:fjl.typeOf
 * @param value {*}
 * @returns {string} - A string representation of the type of the value; E.g., 'Number' for `0`
 */
export const typeOf = value => {
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
    };
