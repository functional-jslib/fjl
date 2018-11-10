(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./jsPlatform/object", "./jsPlatform/array", "./jsPlatform/list", "./jsPlatform/string", "./jsPlatform/function"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./jsPlatform/object"), require("./jsPlatform/array"), require("./jsPlatform/list"), require("./jsPlatform/string"), require("./jsPlatform/function"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object, global.array, global.list, global.string, global._function);
    global.jsPlatform = mod.exports;
  }
})(this, function (_exports, _object, _array, _list, _string, _function) {
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
  Object.keys(_array).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _array[key];
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
  Object.keys(_function).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _function[key];
      }
    });
  });
});