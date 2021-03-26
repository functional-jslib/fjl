export type SlicePred<T> = (x: T, i?: number | string, xs?: Slice<T>) => boolean;

export type Slice<T = any> = T[] | string;
