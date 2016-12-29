/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import Extract from '../../../src/functor/Extract';
import Extend from '../../../src/functor/Extend';
import {subClassMulti} from '../../../src/subClass';

export default subClassMulti([Extract, Extend],
    function Counter (start) {
        Extract.call(this, start);
        Extend.call(this);
    }, {
        increment: function () {
            return this.extend(self => self.value++);
        },
        tally: function () {
            return this.extract();
        },
        toString: function () {
            return '[object ' + this.constructor.name + '(' + this.value + ')]';
        }
    });
