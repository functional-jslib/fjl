import {toCurried2Method} from "../../utils";
import {Join} from "./types";

/**
 * Array.prototype.join
 */
const join = toCurried2Method('join') as Join<any, any[], any>;

export default join;
