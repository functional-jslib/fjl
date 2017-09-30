(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/object_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/object_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object_);
    global.instanceOf = mod.exports;
  }
})(this, function (exports, _object_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'instanceOf', {
    enumerable: true,
    get: function () {
      return _object_.instanceOf;
    }
  });
});