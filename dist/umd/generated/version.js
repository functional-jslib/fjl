(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.version = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
   * Generated Fri Apr 28 2017 14:18:13 GMT-0400 (EDT) 
   */

  var version = exports.version = '0.9.0';

  exports.default = version;
});