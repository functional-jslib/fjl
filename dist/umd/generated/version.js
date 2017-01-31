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
   * Generated Mon Jan 30 2017 16:00:41 GMT-0500 (Eastern Standard Time) 
   */

  var version = exports.version = '0.5.1';

  exports.default = version;
});