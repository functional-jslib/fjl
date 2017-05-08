/**
 * Created by elydelacruz on 2/19/2017.
 */
'use strict';

import Monad from './Monad';
import {subClass} from '../subClass';
import compose from '../compose';
import errorIfNotTypeFactory from '../errorIfNotTypeFactory';
import {isFunction} from '../is';

const ensureFunction = value => !isFunction(value) ? function () {
        return value;
    } : value,

    errorIfNotType = errorIfNotTypeFactory('IO');

function IO (fn) {
    if (!(this instanceof IO)) {
        return IO.of(fn);
    }
    let _value;
    Monad.call(this);
    Object.defineProperty(this, 'value', {
        get: function () {
            return _value;
        },
        set: function (value) {
            errorIfNotType('value', value, Function);
            _value = value;
        },
        enumerable: true
    });
    this.value = ensureFunction(fn);
}

export default subClass(Monad, IO, {
    map: function (fn) {
        return IO.of(compose(fn, this.value));
    },
    do: function () {
        return this.value();
    }
}, {
    of: function (fn) {
        return new IO(ensureFunction(fn));
    }
});
