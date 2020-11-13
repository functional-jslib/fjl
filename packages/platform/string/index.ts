import {toCurried2Method} from "../../utils";
import {SplitFunc} from "./types";

export * from './types';

export const split = toCurried2Method('split') as SplitFunc;
