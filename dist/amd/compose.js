define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = compose;
  /**
   * Created by elyde on 12/6/2016.
   */

  /**
   * @param args {...Function}
   * @returns {function(*=): *}
   */
  function compose() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (arg0) {
      return args.reduceRight(function (value, arg) {
        return arg(value);
      }, arg0);
    };
  }
});