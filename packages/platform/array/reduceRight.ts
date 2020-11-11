import {toCurried3Method} from "../../utils";
import {Reduce} from "./types";

/**
 * Reduces a foldable (list etc.) from the right with passed in function.
 * @function module:platform.reduceRight
 * @param fn {Function}
 * @param functor {Array|{reduceRight: {Function}}}
 * @returns {Array|{reduceRight: {Function}}}
 */
const reduceRight = toCurried3Method('reduceRight') as Reduce<any, any[], any>;

export default reduceRight;
