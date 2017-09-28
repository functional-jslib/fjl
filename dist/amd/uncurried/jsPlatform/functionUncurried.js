define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Created by elydelacruz on 9/7/2017.
   */
  const

  /**
   * Functional `apply` functionOps (takes no context).
   * @function module:jsPlatform.functionOps.apply
   * @param fn {Function}
   * @param args {Array|*}
   * @returns {*}
   */
  apply = exports.apply = (fn, args) => fn.apply(null, args),


  /**
   * Functional `call` functionOps (takes no context).
   * @function module:fnOperators.call
   * @param fn {Function}
   * @param args ...{*}
   * @returns {*}
   */
  call = exports.call = (fn, ...args) => apply(fn, args);
});