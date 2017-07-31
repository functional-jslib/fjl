/**
 *
 */

import {curry} from '../function/curry';

export const prop = curry((name, obj) => obj[name]);
