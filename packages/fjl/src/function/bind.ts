import {Nary} from "../types";

export const bind = <T, RetT>(fn: Nary<T, RetT>, ...args: T[]): Nary<T, RetT> | RetT =>
    fn.bind(null, ...args);
