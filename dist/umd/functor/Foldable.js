(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.Foldable = mod.exports;
    }
})(this, function (exports) {
    /**
     * Created by elyde on 12/25/2016.
     */
    /**
     * Created by edlc on 12/9/16.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function Foldable(value) {
        if (!(this instanceof Foldable)) {
            return new Foldable(value);
        }
        if (!this.hasOwnProperty('value')) {
            Object.defineProperty(this, 'value', {
                value: value,
                writable: true
            });
        }
    }

    Foldable.isFoldable = function (value) {
        return value instanceof Foldable;
    };

    Foldable.prototype = Object.create({});

    Foldable.prototype.reduce = function () {
        return Array.prototype.reduce.apply(this.value, arguments);
    };

    Foldable.prototype.reduceRight = function () {
        return Array.prototype.reduceRight.apply(this.value, arguments);
    };

    Foldable.prototype.map = function () {
        return new this.constructor(Array.prototype.map.apply(this.value, arguments));
    };

    Object.defineProperty(Foldable.prototype, 'constructor', { value: Foldable });

    exports.default = Foldable;
});