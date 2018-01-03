define(['exports', './_jsPlatform/_object', './_jsPlatform/_array', './_jsPlatform/_list', './_jsPlatform/_string', './_jsPlatform/_function'], function (exports, _object, _array, _list, _string, _function) {
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
  Object.keys(_array).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _array[key];
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
  Object.keys(_function).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _function[key];
      }
    });
  });
});