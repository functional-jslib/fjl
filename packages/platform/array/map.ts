import {toCurried2Method} from "../../utils";
import {MapType} from "./types";

/**
 * Maps a function onto functor (list etc.).
 * @function module:platform/array.map
 * @param fn {Function}
 * @param functor {Array|{map: {Function}}}
 * @returns {Array|{map: {Function}}}
 */
const map = toCurried2Method('map') as MapType<any, any[], any, any[]>;

export default map;
