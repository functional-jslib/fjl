(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './jsPlatform/object_', './jsPlatform/array_', './jsPlatform/list_', './jsPlatform/string_', './jsPlatform/function_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./jsPlatform/object_'), require('./jsPlatform/array_'), require('./jsPlatform/list_'), require('./jsPlatform/string_'), require('./jsPlatform/function_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object_, global.array_, global.list_, global.string_, global.function_);
    global._jsPlatform = mod.exports;
  }
})(this, function (exports, _object_, _array_, _list_, _string_, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_object_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _object_[key];
      }
    });
  });
  Object.keys(_array_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _array_[key];
      }
    });
  });
  Object.keys(_list_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _list_[key];
      }
    });
  });
  Object.keys(_string_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _string_[key];
      }
    });
  });
  Object.keys(_function_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _function_[key];
      }
    });
  });
});