import {NaryOf} from "../types";

export const bind = <T, RetT>(fn: NaryOf<T, RetT>, ...args: T[]): NaryOf<T, RetT> | RetT =>
    fn.bind(null, ...args);
