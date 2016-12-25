/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by edlc on 12/9/16.
 */
'use strict';

import Functor from './Functor';
import Foldable from './Foldable';
import {subClassMulti} from './../subClass';

export default subClassMulti([Functor, Foldable],
    function Traversable (value) {
        if (!(this instanceof Traversable)) {
            return new Traversable(value);
        }
        Functor.call(this, value);
        Foldable.call(this, value);
    },
    {
        traverse: function (fn, of) {
            return of(fn());
        }
    });
