(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./jsPlatform/object", "./object/lookup", "./object/typeOf", "./object/copy", "./object/is", "./object/of", "./object/searchObj", "./object/defineProp", "./object/assignDeep", "./object/setTheory", "./object/console", "./object/jsonClone", "./object/toArray", "./object/assocList"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./jsPlatform/object"), require("./object/lookup"), require("./object/typeOf"), require("./object/copy"), require("./object/is"), require("./object/of"), require("./object/searchObj"), require("./object/defineProp"), require("./object/assignDeep"), require("./object/setTheory"), require("./object/console"), require("./object/jsonClone"), require("./object/toArray"), require("./object/assocList"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object, global.lookup, global.typeOf, global.copy, global.is, global.of, global.searchObj, global.defineProp, global.assignDeep, global.setTheory, global.console, global.jsonClone, global.toArray, global.assocList);
    global.object = mod.exports;
  }
})(this, function (_exports, _object, _lookup, _typeOf, _copy, _is, _of, _searchObj, _defineProp, _assignDeep, _setTheory, _console, _jsonClone, _toArray, _assocList) {
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
  Object.keys(_lookup).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _lookup[key];
      }
    });
  });
  Object.keys(_typeOf).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _typeOf[key];
      }
    });
  });
  Object.keys(_copy).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _copy[key];
      }
    });
  });
  Object.keys(_is).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _is[key];
      }
    });
  });
  Object.keys(_of).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _of[key];
      }
    });
  });
  Object.keys(_searchObj).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _searchObj[key];
      }
    });
  });
  Object.keys(_defineProp).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _defineProp[key];
      }
    });
  });
  Object.keys(_assignDeep).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _assignDeep[key];
      }
    });
  });
  Object.keys(_setTheory).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _setTheory[key];
      }
    });
  });
  Object.keys(_console).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _console[key];
      }
    });
  });
  Object.keys(_jsonClone).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _jsonClone[key];
      }
    });
  });
  Object.keys(_toArray).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _toArray[key];
      }
    });
  });
  Object.keys(_assocList).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _assocList[key];
      }
    });
  });
});