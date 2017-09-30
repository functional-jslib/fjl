define(['exports', '../functionOps/curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.prop = undefined;


  /**
   * Returns property value if found; Else `undefined`.
   * @function module:objectOps.prop
   * @param name {String} - Key to search on `obj`
   * @param obj {Object} - Object to search `name` on.
   * @returns {*}
   */
  const prop = exports.prop = (0, _curry.curry)((name, obj) => obj[name]); /**
                                                                            * @memberOf objectOps
                                                                            */
});