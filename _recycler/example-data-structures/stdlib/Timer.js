/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import {subClass} from '../../../src/subClass';
import Bifunctor from '../../../src/functor/Bifunctor';

export default subClass(Bifunctor, function Timer () {
    Bifunctor.call(this, Date.now(), 0);
}, {
    elapsedTime: function () {
        return this.second(value => {
            return Date.now() - value;
        }).value2;
    }
});
