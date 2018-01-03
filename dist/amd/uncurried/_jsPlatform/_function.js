define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Created by elydelacruz on 9/7/2017.
   * @module _jsPlatform_function
   * @private
   */
  const

  /**
   * Functional `apply` function (takes no context).
   * @function module:_jsPlatform_function.apply
   * @param fn {Function}
   * @param args {Array|*}
   * @returns {*}
   */
  apply = exports.apply = (fn, args) => fn.apply(null, args),


  /**
   * Functional `call` function (takes no context).
   * @function module:_jsPlatform_function.call
   * @param fn {Function}
   * @param args {...*}
   * @returns {*}
   */
  call = exports.call = (fn, ...args) => apply(fn, args);
});