(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../uncurried/functionOps/curry_', '../uncurried/objectOps/setTheory_'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../uncurried/functionOps/curry_'), require('../uncurried/objectOps/setTheory_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry_, global.setTheory_);
        global.setTheory = mod.exports;
    }
})(this, function (exports, _curry_, _setTheory_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = undefined;
    var objUnion = exports.objUnion = (0, _curry_.curry)(_setTheory_.objUnion),
        objIntersect = exports.objIntersect = (0, _curry_.curry)(_setTheory_.objIntersect),
        objDifference = exports.objDifference = (0, _curry_.curry)(_setTheory_.objDifference),
        objComplement = exports.objComplement = (0, _curry_.curry2)(_setTheory_.objComplement);
});