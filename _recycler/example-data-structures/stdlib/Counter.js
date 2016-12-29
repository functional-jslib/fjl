/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import {Functor} from '../../../src/functor/Functor';
import {subClass} from '../../../src/subClass';

export default subClass(Functor,
    function Counter (start) {
        Functor.call(this, start);
    }, {
        increase: function () {
            return this.map(value => value + 1);
        }
    });
