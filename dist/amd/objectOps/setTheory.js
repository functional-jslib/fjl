define(['exports', '../uncurried/functionOps/curry_', '../uncurried/objectOps/setTheory_'], function (exports, _curry_, _setTheory_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;
    const objUnion = exports.objUnion = (0, _curry_.curry)(_setTheory_.objUnion),
          objIntersect = exports.objIntersect = (0, _curry_.curry)(_setTheory_.objIntersect),
          objDifference = exports.objDifference = (0, _curry_.curry)(_setTheory_.objDifference),
          objComplement = exports.objComplement = (0, _curry_.curry2)(_setTheory_.objComplement);
});