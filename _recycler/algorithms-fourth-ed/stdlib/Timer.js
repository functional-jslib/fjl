/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import {subClassMulti} from '../../../src/subClass';
import Extract from '../../../tests/for-server/functor/Extract';
import Bifunctor from '../../../tests/for-server/functor/Bifunctor';

export default subClassMulti([Extract, Bifunctor], function Timer () {
    Bifunctor.call(this, Date.now(), 0);
}, {
    elapsedTime: function () {
        return this.first(value => {
            return Date.now() - value;
        }).extract();
    },
});
