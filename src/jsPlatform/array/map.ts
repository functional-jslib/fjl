import {toCurried2Method} from "../../utils";

/**
 * Maps a function onto functor (list etc.).
 * @function module:jsPlatform.map
 * @param fn {Function}
 * @param functor {Array|{map: {Function}}}
 * @returns {Array|{map: {Function}}}
 */
const map = toCurried2Method('map');

export default map;
