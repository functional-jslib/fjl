/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Functor from './Functor';
import {defineSubClass} from './../defineSubClass';

let Bifunctor = defineSubClass(Functor,
    function Bifunctor (value1, value2) {
        if (!this) {
            return new Bifunctor(value1, value2);
        }
        Functor.call(this, value1);
        Object.defineProperty(this, 'value2', {
            value: value2,
            writable: true
        });
    },
    {
        map1 (fn) {
            return this.map(fn);
        },

        map2 (fn) {
            return new this.constructor(this.value, fn(this.value2));
        },

        first (fn) {
            return this.map1(fn);
        },

        second (fn) {
            return this.map2(fn);
        },

        bimap: function (fn1, fn2) {
            return new this.constructor(
                fn1(this.value),
                fn2(this.value2)
            );
        }
    });

export default Bifunctor;
