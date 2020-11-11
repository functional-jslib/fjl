import {toCurried2Method} from "../../utils";
import {MapType} from "./types";

/**
 * Maps a function onto functor (list etc.).
 */
const map = toCurried2Method('map') as MapType<any, any[], any, any[]>;

export default map;
