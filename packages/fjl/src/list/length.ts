import {isset} from "../object";

export const length = (x: { readonly length?: number }) => !isset(x) ? undefined : x.length;
