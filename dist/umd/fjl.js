(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./object", "./boolean", "./function", "./list", "./string", "./utils", "./errorThrowing", "./jsPlatform"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./object"), require("./boolean"), require("./function"), require("./list"), require("./string"), require("./utils"), require("./errorThrowing"), require("./jsPlatform"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object, global.boolean, global._function, global.list, global.string, global.utils, global.errorThrowing, global.jsPlatform);
    global.fjl = mod.exports;
  }
})(this, function (_exports, _object, _boolean, _function, _list, _string, _utils, _errorThrowing, _jsPlatform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    jsPlatform: true
  };
  _exports.jsPlatform = void 0;
  Object.keys(_object).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _object[key];
      }
    });
  });
  Object.keys(_boolean).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _boolean[key];
      }
    });
  });
  Object.keys(_function).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _function[key];
      }
    });
  });
  Object.keys(_list).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _list[key];
      }
    });
  });
  Object.keys(_string).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _string[key];
      }
    });
  });
  Object.keys(_utils).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _utils[key];
      }
    });
  });
  Object.keys(_errorThrowing).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _errorThrowing[key];
      }
    });
  });
  _jsPlatform = _interopRequireWildcard(_jsPlatform);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  /**
   * @module fjl
   * @description Exports all module methods (object, list, string modules etc.).
   * @goal to include everything from haskell's Prelude where it makes sense in order to create
   *  a subset of functions which can make the javascript developer more efficient and make his/her
   *  code more concise (and functional).
   * @motivation preludejs, lodash/fp, RamdaJs, Haskell.
   * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Prelude.html
   * @see http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html
   */
  var jsPlatform = _jsPlatform;
  /**
   * @typedef {String|Function|ArrayBufferConstructor|ArrayConstructor|BooleanConstructor|MapConstructor|NumberConstructor|SetConstructor|WeakMapConstructor|WeakSetConstructor} TypeRef
   * @description Type reference.  Either actual type or type's name;  E.g., `Type.name`
   * Also note: Class cased names are use for values that do not have `name` properties;  Namely: 'Null', 'NaN' and 'Undefined' (for their respective values respectively).
   */

  _exports.jsPlatform = jsPlatform;
});