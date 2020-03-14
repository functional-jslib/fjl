(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./jsPlatform/function", "./function/compose", "./function/curry", "./function/flip", "./function/id", "./function/negate", "./function/until", "./function/fnOrError", "./function/noop", "./function/trampoline", "./function/toFunction"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./jsPlatform/function"), require("./function/compose"), require("./function/curry"), require("./function/flip"), require("./function/id"), require("./function/negate"), require("./function/until"), require("./function/fnOrError"), require("./function/noop"), require("./function/trampoline"), require("./function/toFunction"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._function, global.compose, global.curry, global.flip, global.id, global.negate, global.until, global.fnOrError, global.noop, global.trampoline, global.toFunction);
    global._function = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _function, _compose, _curry, _flip, _id, _negate, _until, _fnOrError, _noop, _trampoline, _toFunction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
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
  Object.keys(_compose).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _compose[key];
      }
    });
  });
  Object.keys(_curry).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _curry[key];
      }
    });
  });
  Object.keys(_flip).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _flip[key];
      }
    });
  });
  Object.keys(_id).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _id[key];
      }
    });
  });
  Object.keys(_negate).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _negate[key];
      }
    });
  });
  Object.keys(_until).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _until[key];
      }
    });
  });
  Object.keys(_fnOrError).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _fnOrError[key];
      }
    });
  });
  Object.keys(_noop).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _noop[key];
      }
    });
  });
  Object.keys(_trampoline).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _trampoline[key];
      }
    });
  });
  Object.keys(_toFunction).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _toFunction[key];
      }
    });
  });
});