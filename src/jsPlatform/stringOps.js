/**
 * Created by elydelacruz on 9/6/2017.
 */

import {curry} from '../functionOps/curry';

import {split as pureSplit} from '../../src-uncurried/jsPlatform/stringOpsUnCurried';

export const split = curry(pureSplit);
