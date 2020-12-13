import {TernaryPredOf} from "../../types";

export type SlicePred<T> = TernaryPredOf<T, number, Slice<T>>;

export type Slice<T = any> = T[] | string;
