"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _Number = Number.name, _NaN = 'NaN', _Null = 'Null', _Undefined = 'Undefined';
function typeOf(value) {
    let retVal;
    if (value === undefined) {
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
exports.typeOf = typeOf;
//# sourceMappingURL=typeOf.js.map