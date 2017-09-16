/**
 *
 */

import {curry} from '../functionOps/curry';

export const prop = curry((name, obj) => obj[name]);
