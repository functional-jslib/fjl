(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./object", "./boolean", "./function", "./list", "./string", "./utils", "./errorThrowing"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./object"), require("./boolean"), require("./function"), require("./list"), require("./string"), require("./utils"), require("./errorThrowing"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object, global.boolean, global._function, global.list, global.string, global.utils, global.errorThrowing);
    global.fjl = mod.exports;
  }
})(this, function (_exports, _object, _boolean, _function, _list, _string, _utils, _errorThrowing) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.keys(_object).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _object[key];
      }
    });
  });
  Object.keys(_boolean).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _boolean[key];
      }
    });
  });
  Object.keys(_function).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _function[key];
      }
    });
  });
  Object.keys(_list).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _list[key];
      }
    });
  });
  Object.keys(_string).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _string[key];
      }
    });
  });
  Object.keys(_utils).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _utils[key];
      }
    });
  });
  Object.keys(_errorThrowing).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _errorThrowing[key];
      }
    });
  });
});