(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../functionOps/curry'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../functionOps/curry'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry);
    global.prop = mod.exports;
  }
})(this, function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.prop = undefined;
  var prop = exports.prop = (0, _curry.curry)(function (name, obj) {
    return obj[name];
  }); /**
       *
       */
});