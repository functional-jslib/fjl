(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './jsPlatform/array', './jsPlatform/list', './jsPlatform/string'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./jsPlatform/array'), require('./jsPlatform/list'), require('./jsPlatform/string'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.array, global.list, global.string);
    global.jsPlatform = mod.exports;
  }
})(this, function (exports, _array, _list, _string) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
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
});