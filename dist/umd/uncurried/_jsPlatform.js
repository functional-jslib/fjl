(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './_jsPlatform/object_', './_jsPlatform/array_', './_jsPlatform/list_', './_jsPlatform/string_', './_jsPlatform/function_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./_jsPlatform/object_'), require('./_jsPlatform/array_'), require('./_jsPlatform/list_'), require('./_jsPlatform/string_'), require('./_jsPlatform/function_'));
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