import {isset} from "../object/isset";

export const length = (x: { length?: number }): number => !x || !isset(x) ? undefined : x.length;
