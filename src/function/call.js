/**
 * Created by elydelacruz on 7/22/2017.
 */
import {curry2} from './curry';

export const call = curry2((fn, ...args) => fn.call(null, ...args));
