'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;

var _curry_ = require('../uncurried/functionOps/curry_');

var _setTheory_ = require('../uncurried/objectOps/setTheory_');

var objUnion = exports.objUnion = (0, _curry_.curry)(_setTheory_.objUnion),
    objIntersect = exports.objIntersect = (0, _curry_.curry)(_setTheory_.objIntersect),
    objDifference = exports.objDifference = (0, _curry_.curry)(_setTheory_.objDifference),
    objComplement = exports.objComplement = (0, _curry_.curry2)(_setTheory_.objComplement);