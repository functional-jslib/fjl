import {UnitNary} from "../types";

export const bind = <F extends UnitNary>(fn: F, ...args: any[]): ReturnType<F> =>
    fn.bind(null, ...args);
