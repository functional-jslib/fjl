define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const

  /**
   * `Console.log` method.
   * @function module:objectOps.log
   * @params args {...*}
   * @returns {void}
   */
  log = exports.log = console.log.bind(console),


  /**
   * `Console.error` method.
   * @function module:objectOps.error
   * @params args {...*}
   * @returns {void}
   */
  error = exports.error = console.error.bind(console),


  /**
   * Peeks at incoming value(s) and returns the last value.
   * @function module:objectOps.peek
   * @param args {...*}
   * @returns {*} - Last given value (if one or more values) else first value.
   */
  peek = exports.peek = (...args) => (log(...args), args.pop());
});