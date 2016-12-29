/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import Extract from '../../../src/functor/Extract';
import Extend from '../../../src/functor/Extend';
import {subClassMulti} from '../../../src/subClass';

export default subClassMulti([Extract, Extend],
    function Counter(start) {
        if (!(this instanceof Counter)) {
            return new Counter(start);
        }
        Extract.call(this, start || 0);
        Extend.call(this);
    }, {
        increment: function () {
            return this.extend(self => {
                self.value++;
                return self;
            });
        },
        toString: function () {
            return '[object ' + this.constructor.name + '(' + this.value + ')]';
        }
    });
