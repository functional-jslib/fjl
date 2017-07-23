/**
 * Created by elyde on 7/15/2017.
 */

import {isFunction} from './is';

export const negate = x => isFunction(x) ? (value) => !x(value) : x * -1;
