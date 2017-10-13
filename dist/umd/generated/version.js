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
   * Generated Fri Oct 13 2017 18:29:35 GMT-0400 (Eastern Daylight Time) 
   */

  var version = exports.version = '0.17.5';

  exports.default = version;
});