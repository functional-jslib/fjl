(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_objectOps/_utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_objectOps/_utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._utils);
    global._object = mod.exports;
  }
})(this, function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.assign = exports.keys = exports.length = exports.hasOwnProperty = exports.instanceOf = undefined;
  var

  /**
   * Returns whether constructor has derived _objectOps.
   * @function module:_jsPlatform_objectOps.instanceOf
   * @param instanceConstructor {Function} - Constructor.
   * @param instance {*}
   * @instance {*}
   * @returns {Boolean}
   */
  instanceOf = exports.instanceOf = function instanceOf(instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
  },


  /**
   * @function module:_jsPlatform_objectOps.hasOwnProperty
   * @param propName {*}
   * @param typeInstance {*}
   * @returns {Boolean}
   */
  hasOwnProperty = exports.hasOwnProperty = (0, _utils.fPureTakesOne)('hasOwnProperty'),


  /**
   * @function module:_jsPlatform_objectOps.length
   * @param x {*}
   * @returns {Number}
   * @throws {Error} - Throws an error if value doesn't have a `length` property (
   *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
   */
  length = exports.length = function length(x) {
    return x.length;
  },


  /**
   * Gets own enumerable keys of passed in object (`Object.keys`).
   * @function module:_jsPlatform_objectOps.keys
   * @param obj {*}
   * @returns {Array<String>}
   */
  keys = exports.keys = function keys(obj) {
    return Object.keys(obj);
  },


  /**
   * Defined as `Object.assign` else is the same thing but shimmed.
   * @function module:_jsPlatform_objectOps.assign
   * @param obj0 {Object}
   * @param objs {...{Object}}
   * @returns {Object}
   */
  assign = exports.assign = function () {
    return Object.assign ? function (obj0) {
      for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objs[_key - 1] = arguments[_key];
      }

      return Object.assign.apply(Object, [obj0].concat(objs));
    } : function (obj0) {
      for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        objs[_key2 - 1] = arguments[_key2];
      }

      return objs.reduce(function (topAgg, obj) {
        return keys(obj).reduce(function (agg, key) {
          agg[key] = obj[key];
          return agg;
        }, topAgg);
      }, obj0);
    };
  }(); /**
        * Created by elydelacruz on 9/6/2017.
        * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
        * throughout the library.  @note Doesn't include all methods for objects just the ones used in
        *  the library.
        * @todo change all files named '*UnCurried' to '*_'.
        */
});