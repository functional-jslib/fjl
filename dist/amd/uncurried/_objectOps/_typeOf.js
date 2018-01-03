define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.typeOf = typeOf;
    /**
     * Created by elyde on 12/18/2016.
     * @memberOf _objectOps_
     */
    const _Number = Number.name,
          _NaN = 'NaN',
          _Null = 'Null',
          _Undefined = 'Undefined';

    /**
     * Returns the class name of an object from it's class string.
     * @note Returns 'NaN' if value `isNaN` and value type is 'Number'.
     * @function module:_objectOps.typeOf
     * @param value {*}
     * @returns {string} - Constructor's name property if not null or undefined (in which case a
     *  name representing those types is returned ('Null' and or 'Undefined' (es6 compliant))).
     */
    function typeOf(value) {
        let retVal;
        if (value === undefined) {
            retVal = _Undefined;
        } else if (value === null) {
            retVal = _Null;
        } else {
            let constructorName = value.constructor.name;
            retVal = constructorName === _Number && isNaN(value) ? _NaN : constructorName;
        }
        return retVal;
    }
});