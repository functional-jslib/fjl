import {fPureTakes2} from "../../utils";

/**
 * Reduces a foldable (list etc.) from the right with passed in function.
 * @function module:jsPlatform.reduceRight
 * @param fn {Function}
 * @param functor {Array|{reduceRight: {Function}}}
 * @returns {Array|{reduceRight: {Function}}}
 */
const reduceRight = fPureTakes2('reduceRight');

export default reduceRight;