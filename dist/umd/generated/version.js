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
   * Generated Wed Feb 15 2017 11:40:19 GMT-0500 (EST) 
   */

  var version = exports.version = '0.7.1';

  exports.default = version;
});