(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './uncurried/_object/_object', './uncurried/_jsPlatform/_object', './uncurried/_function/_curry', './uncurried/_object/_fromNamespace', './uncurried/_object/_assignDeep', './uncurried/_object/_setTheory'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./uncurried/_object/_object'), require('./uncurried/_jsPlatform/_object'), require('./uncurried/_function/_curry'), require('./uncurried/_object/_fromNamespace'), require('./uncurried/_object/_assignDeep'), require('./uncurried/_object/_setTheory'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._object, global._object, global._curry, global._fromNamespace, global._assignDeep, global._setTheory);
    global.object = mod.exports;
  }
})(this, function (exports, _object, _object2, _curry, _fromNamespace2, _assignDeep2, _setTheory) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromNamespace = exports.isType = exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.prop = exports.keys = exports.length = undefined;
  Object.keys(_object).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _object[key];
      }
    });
  });
  Object.defineProperty(exports, 'length', {
    enumerable: true,
    get: function () {
      return _object2.length;
    }
  });
  Object.defineProperty(exports, 'keys', {
    enumerable: true,
    get: function () {
      return _object2.keys;
    }
  });
  var

  /**
   * Gives `undefined` or prop value if it is available.
   * @function module:object.prop
   * @param propName {String}
   * @param obj {*} - Object to search.
   * @returns {*|undefined}
   * @curried
   */
  prop = exports.prop = (0, _curry.curry)(_object._prop),


  /**
   * `instanceof` in function form.
   * @function module:object.instanceOf
   * @param instance {*}
   * @param Type {Function}
   * @returns {Boolean}
   * @curried
   */
  instanceOf = exports.instanceOf = (0, _curry.curry)(_object2._instanceOf),


  /**
   * `hasOwnProperty` as a method (takes object last).
   * @function module:object.hasOwnProperty
   * @param propName {String}
   * @param obj {*} - Object to search.
   * @returns {Boolean}
   * @curried
   */
  hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_object2._hasOwnProperty),


  /**
   * `Object.assign` if it is available else a shim.
   * @function module:object.assign
   * @param [...obj]{Object} - One or more objects to merge onto first object.
   * @returns {Object}
   * @curried - Called after having two or more args
   */
  assign = exports.assign = (0, _curry.curry2)(_object2._assign),


  /**
   * Same as `Object.assign` except does a deep merge.
   * @function module:object.assignDeep
   * @param [...obj]{Object} - One or more objects to deep merge onto first object.
   * @returns {Object}
   * @curried - Called after having two or more args
   */
  assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep2._assignDeep),


  /**
   * Cartesian union for objects (operates on two objects).
   * @function module:object.objUnion
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Unified obj.
   * @curried
   */
  objUnion = exports.objUnion = (0, _curry.curry)(_setTheory._objUnion),


  /**
   * Returns the cartesian intersection of two objects.
   * @function module:object.objIntersect
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Intersection of given objects.
   * @curried
   */
  objIntersect = exports.objIntersect = (0, _curry.curry)(_setTheory._objIntersect),


  /**
   * Returns the cartesian difference of two objects.
   * @function module:object.objDifference
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Difference of given objects.
   * @curried
   */
  objDifference = exports.objDifference = (0, _curry.curry)(_setTheory._objDifference),


  /**
   * Returns the cartesian complement of one or more objects on given object.
   * @function module:object.objDifference
   * @param obj {Object}
   * @param [...obj]{Object} - One or more objects to calculate complement from.
   * @returns {Object} - Complement of given objects.
   * @curried
   */
  objComplement = exports.objComplement = (0, _curry.curry2)(_setTheory._objComplement),


  /**
   * Returns a boolean indicating whether a value is of given type or not.
   * @function module:object.isType
   * @param Type {Function|String} - Constructor or constructor name
   * @param value {*}
   * @return {Boolean}
   */
  isType = exports.isType = (0, _curry.curry)(_object._isType),


  /**
   * Gives you value at key/namespace-key;  E.g.,
   * ```
   *   fromNamespace('all.your.base', {all: {your: {base: 99}}}) === 99
   * ```
   * @note same as `_fromNamespace` except, is curried
   * @function module:object.fromNamespace
   * @param nsString {String}
   * @param obj {*}
   * @returns {*}
   * @curried
   */
  fromNamespace = exports.fromNamespace = (0, _curry.curry)(_fromNamespace2._fromNamespace);
});