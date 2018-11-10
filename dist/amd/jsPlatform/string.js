define(["exports", "../utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.split = void 0;

  /**
   * Created by elydelacruz on 9/6/2017.
   */

  /**
   * Functional version of `String.prototype.split`.
   * @function module:_string.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  var split = (0, _utils.fPureTakesOne)('split');
  _exports.split = split;
});