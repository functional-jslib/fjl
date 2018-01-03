/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import Extract from '../../../tests/for-server/functor/Extract';
import Extend from '../../../tests/for-server/functor/Extend';
import {subClassMulti} from '../../src/subClass';

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
            return '[_objectOps ' + this.constructor.name + '(' + this.value + ')]';
        }
    });
