define(['exports', './jsPlatform/object_', './jsPlatform/array_', './jsPlatform/list_', './jsPlatform/string_', './jsPlatform/function_'], function (exports, _object_, _array_, _list_, _string_, _function_) {
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