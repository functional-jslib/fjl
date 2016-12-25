(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './../is', './../curry', './../operators', './../subClass', './Maybe', './../functor/Bifunctor', './Monad'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./../is'), require('./../curry'), require('./../operators'), require('./../subClass'), require('./Maybe'), require('./../functor/Bifunctor'), require('./Monad'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.curry, global.operators, global.subClass, global.Maybe, global.Bifunctor, global.Monad);
        global.Either = mod.exports;
    }
})(this, function (exports, _is, _curry, _operators, _subClass, _Maybe, _Bifunctor, _Monad) {
    /**
     * Created by elyde on 12/10/2016.
     */
    'use strict';
    /**
     * Created by elyde on 11/20/2016.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Either = exports.either = exports.Right = exports.Left = undefined;

    var _Bifunctor2 = _interopRequireDefault(_Bifunctor);

    var _Monad2 = _interopRequireDefault(_Monad);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Left = exports.Left = (0, _subClass.subClass)(_Monad2.default, {
        constructor: function Left(value) {
            if (!(this instanceof Left)) {
                return Left.of(value);
            }
            _Monad2.default.call(this, value);
        },
        map: function map(fn) {
            fn(this.value);
            return this;
        }
    }, {
        of: function of(value) {
            return new Left(value);
        }
    }),
        Right = exports.Right = (0, _subClass.subClass)(_Monad2.default, {
        constructor: function Right(value) {
            if (!(this instanceof Right)) {
                return Right.of(value);
            }
            _Monad2.default.call(this, value);
        },
        map: function map(fn) {
            var constructor = this.constructor;
            return (0, _is.isset)(this.value) ? constructor.of(fn(this.value)) : constructor.counterConstructor.of(this.value);
        }
    }, {
        of: function of(value) {
            return new Right(value);
        },
        counterConstructor: Left
    }),
        either = exports.either = (0, _curry.curry2)(function (leftCallback, rightCallback, monad) {
        var identity = (0, _operators.map)(function (value) {
            return value;
        }, monad),
            ctor = identity.constructor;
        if (ctor === Left) {
            return (0, _operators.map)(leftCallback, identity);
        } else if (ctor === Right) {
            return (0, _operators.map)(rightCallback, identity);
        }
    }),
        Either = exports.Either = (0, _subClass.subClassMulti)([_Monad2.default, _Bifunctor2.default], {
        constructor: function Either(left, right) {
            if (!(this instanceof Either)) {
                return Either.of(left, right);
            }
            _Bifunctor2.default.call(this, left, right);
        }
    }, {
        of: function of(left, right) {
            return new Either(left, right);
        },
        Left: Left,
        Right: Right,
        either: either
    });

    exports.default = Either;
});