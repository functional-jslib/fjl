/**
 * Created by elyde on 7/15/2017.
 */

import negate from './negate';

export const
    isset = value => !!value,
    and = (...args) => args.every(isset),
    or = (...args) => args.some(isset),
    not = (...args) => negate(isset).apply(null, ...args);

export default {
    and,
    or,
    not
};
