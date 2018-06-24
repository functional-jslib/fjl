(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './object', './boolean', './function', './list', './string', './utils', './uncurried/_list/_utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./object'), require('./boolean'), require('./function'), require('./list'), require('./string'), require('./utils'), require('./uncurried/_list/_utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object, global.boolean, global._function, global.list, global.string, global.utils, global._utils);
    global.fjl = mod.exports;
  }
})(this, function (exports, _object, _boolean, _function, _list, _string, _utils, _utils2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_object).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _object[key];
      }
    });
  });
  Object.keys(_boolean).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _boolean[key];
      }
    });
  });
  Object.keys(_function).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _function[key];
      }
    });
  });
  Object.keys(_list).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _list[key];
      }
    });
  });
  Object.keys(_string).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _string[key];
      }
    });
  });
  Object.keys(_utils).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _utils[key];
      }
    });
  });
  Object.keys(_utils2).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _utils2[key];
      }
    });
  });
});