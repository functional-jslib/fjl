/**
 * Created by elyde on 12/10/2016.
 */
'use strict';
/**
 * Created by elyde on 11/20/2016.
 */

'use strict';

import {curry2} from './../curry';
import {map} from './../operators';
import {subClass, subClassMulti} from './../subClass';
import Maybe, {Just} from './Maybe';
import BiFunctor from './../functor/Bifunctor';
import Monad from './Monad';

let Left = subClass(Just, {
        constructor: function Left(value) {
            if (!(this instanceof Left)) {
                return Left.of(value);
            }
            Just.call(this, value);
        },
        map: function (fn) {
            map(fn, this.value);
            return this;
        }
    }),

    Right = subClass(Just, {
        constructor: function Right(value) {
            if (!(this instanceof Right)) {
                return Right.of(value);
            }
            Just.call(this, value);
        }
    },
    null,
    {
        counterConstructor: Left
    }),

    either = curry2((leftCallback, rightCallback, monad) => {
        let identity = map(value => value, monad),
            ctor = identity.constructor;
        if (ctor === Left) {
            return map(leftCallback, identity);
        }
        else if (ctor === Right) {
            return map(rightCallback, identity);
        }
    }),

    Either = subClassMulti([Monad, BiFunctor], {
        constructor: function Either(left, right) {
            if (!(this instanceof Either)) {
                return new Either(left, right);
            }
            BiFunctor.call(this, left, right);
            Monad.call(this);
        }
    },
    null,
    {
        of: function (value) {
            return new Maybe(value);
        },
        Left,
        Right,
        either
    });

export default Either;
