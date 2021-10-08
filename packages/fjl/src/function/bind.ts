import {UnitNary} from "../types";

export const bind = <F extends UnitNary, Params extends any[], RetT>(fn: F, ...args: [...Params]): F | RetT =>
    fn.bind(null, ...args);
