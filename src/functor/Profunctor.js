/**
 * Created by edlc on 12/9/16.
 */
/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Functor from './Functor';
import {subClass} from './../subClass';

let Profunctor = subClass(Functor,
    function Profunctor (value1, value2) {
        if (!(this instanceof Profunctor)) {
            return new Profunctor(value1, value2);
        }
        Functor.call(this, value1);
        Profunctor.addValue2Property(this, value2);
    },
    {
        first (fn) {
            return new this.constructor(fn(this.value), this.value2);
        },

        second (fn) {
            return new this.constructor(this.value, fn(this.value2));
        },

        promap: function (fn1, fn2) {
            return new this.constructor(
                fn1(this.value),
                fn2(this.value2)
            );
        }
    });

Profunctor.addValue2Property = function (instance, value) {
    if (!instance.hasOwnProperty('value2')) {
        Object.defineProperty(instance, 'value2', {
            value: value,
            writable: true
        });
    }
    return instance;
};

export default Profunctor;
