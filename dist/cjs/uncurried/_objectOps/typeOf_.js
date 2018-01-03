'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.typeOf = typeOf;
/**
 * Created by elyde on 12/18/2016.
 * @memberOf objectOps_
 */
var _Number = Number.name,
    _NaN = 'NaN',
    _Null = 'Null',
    _Undefined = 'Undefined';

/**
 * Returns the class name of an object from it's class string.
 * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
 * @function module:objectOps_.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name property if not null or undefined (in which case a
 *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
 */
function typeOf(value) {
    var retVal = void 0;
    if (value === undefined) {
        retVal = _Undefined;
    } else if (value === null) {
        retVal = _Null;
    } else {
        var constructorName = value.constructor.name;
        retVal = constructorName === _Number && isNaN(value) ? _NaN : constructorName;
    }
    return retVal;
}