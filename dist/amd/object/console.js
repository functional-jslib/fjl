define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.peek = _exports.error = _exports.log = void 0;

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
  };

  _exports.peek = peek;
  _exports.error = error;
  _exports.log = log;
});