(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.console = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.warn = _exports.peek = _exports.error = _exports.log = void 0;

  /**
   * @module console
   * @description Console exports.
   */
  var
  /**
   * `Console.log` method.
   * @function module:console.log
   * @params args {...*}
   * @returns {void}
   */
  log = console.log.bind(console),

  /**
   * `Console.error` method.
   * @function module:console.error
   * @params args {...*}
   * @returns {void}
   */
  error = console.error.bind(console),

  /**
   * Peeks (console.log) at incoming value(s) and returns the last value.
   * @function module:console.peek
   * @param args {...*}
   * @returns {*} Last given value (if one or more values) else first value.
   */
  peek = function peek() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return log.apply(void 0, args), args.pop();
  },

  /**
   * `Console.warn`.
   * @function module:console.warn
   * @param args {...*}
   * @returns {void}
   */
  warn = console.warn.bind(console);

  _exports.warn = warn;
  _exports.peek = peek;
  _exports.error = error;
  _exports.log = log;
});