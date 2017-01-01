/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

let  expectInstanceOf = curry2((value, instance) => expect(value).to.be.instanceOf(instance)),

    expectFunction = value => expectInstanceOf(value, Function),

    expectEqual = curry2((value, value2) => expect(value).to.be.equal(value2)),

    expectFalse = value => expectEqual(value, false),

    expectTrue = value => expectEqual(value, true),

    hasOwnProperty = (instance, key) => Object.prototype.hasOwnProperty.call(instance, key),

    add = curry2((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    multiply = curry2((...args) => {
        return args.reduce((agg, num) => num * agg, 1);
    }),

    divide = curry2((...args) => {
        return args.reduce((agg, num) => agg / num, args.shift());
    }),

    unwrapMonad = monad => {
        var value = monad;
        while (value instanceof Monad) {
            value = join(monad);
        }
        return value;
    };
//
// export default {
//     expectFunction,
//     expectInstanceOf,
//     expectEqual,
//     expectFalse,
//     expectTrue,
//     unwrapMonad,
//     add,
//     multiply,
//     divide
// };

/**
 * Created by elyde on 12/29/2016.
 */

describe ('Array Combinators', function () {

    describe ('#complement', function () {
        it ('should return an empty array when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, complement)();
        });
        it ('should return an empty array if only one array is passed in', function () {
            compose(expectEqual(__, 0), length, complement)([1,2,3]);
        });
        it ('should return elements not in first array passed to it', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[[1, 2, 3], [1, 2, 3, 4, 5]], 2, [4, 5]],
                [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7, 8]], 7, [4, 5, 4, 5, 6, 7, 8]],
                [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 1, 2, 3]], 4, [4, 5, 4, 5]]
            ];
            testCases.forEach(testCase => {
                let [subjects, expectedLen, expectedElms] = testCase,
                    result = complement.apply(null, subjects);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#difference', function () {
        it ('should return an empty array when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, difference)();
        });
        it ('should return a clone of the passed in array if it is only the first array that is passed in', function () {
            compose(expectEqual(__, 3), length, difference(__, []))([1,2,3]);
        });
        it ('should return an empty array when there are no differences between the two arrays passed in', function () {
            compose(expectEqual(__, 0), length, difference(__, [1, 2, 3]))([1,2,3]);
        });
        it ('should return a clone of the passed in array if it is only the first array that is passed in', function () {
            compose(expectEqual(__, 3), length, difference(__, []))([1,2,3]);
        });
        it ('should return the difference between two arrays passed in', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 0, []],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 5, [4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 2, [4, 5]]
            ];
            testCases.forEach(testCase => {
                let [subj1, subj2, expectedLen, expectedElms] = testCase,
                    result = difference(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#intersect', function () {
        it ('should return an empty array when receiving an empty array as parameter 1', function () {
            compose(expectEqual(__, 0), length, intersect)([]);
            compose(expectEqual(__, 0), length, intersect([]))([1, 2, 3]);
        });
        it ('should return an empty array when receiving an empty array as parameter 2', function () {
            compose(expectEqual(__, 0), length, intersect([1, 2, 3]))([]);
        });
        it ('should return an empty array when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, intersect([]))([]);
        });
        it ('should return an empty array when no arrays are passed in', function () {
            compose(expectEqual(__, 0), length, intersect)();
        });
        it ('should return an intersection of the two arrays passed in', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 3, [1, 2, 3]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 3, [1, 2, 3]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 3, [1, 2, 3]]
            ];
            testCases.forEach(testCase => {
                let [subj1, subj2, expectedLen, expectedElms] = testCase,
                    result = intersect(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe ('#union', function () {
        it ('should return an union of the two arrays', function () {
            let testCases = [
                // subj1, subj2, expectLen, expectedElements
                [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
                [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]],
                [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4 ,5]]
            ];
            testCases.forEach(testCase => {
                let [subj1, subj2, expectedLen, expectedElms] = testCase,
                    result = union(subj1, subj2);
                expectEqual(result.length, expectedLen);
                result.forEach((elm, ind) => {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

});

/**
 * Created by elyde on 11/13/2016.
 */
describe('compose', function () {

    it ('should be of type function.', function () {
        expect(compose).to.be.instanceOf(Function);
    });

    it ('should return a function whether or not any parameters were passed in to it.', function () {
        expect(compose()).to.be.instanceOf(Function);
        expect(compose(console.log)).to.be.instanceOf(Function);
    });

    it ('should return a function that when used returns the passed in value if `compose` ' +
        'itself didn\'t receive any parameters.', function () {
        let result = compose();
        expect(result(99)).to.equal(99);
    });

    it ('should be able to compose an arbitrary number of functions and execute them as expected ' +
        'from generated function.', function () {
        let min = curry2(Math.min),
            max = curry2(Math.max),
            pow = curry2(Math.pow),
            composed = compose(min(8), max(5), pow(2)),
            randomNum = curry2( (start, end) => Math.round(Math.random() * end + start) ),
            random = randomNum(0),
            expectedFor = (num) => min(8, max(5, pow(num, 2)));
            [8,5,3,2,1,0, random(89), random(55), random(34)].forEach(function (num) {
                expect(composed(num)).to.equal(expectedFor(num));
            });
    });

});

/**
 * Created by elyde on 11/13/2016.
 */

describe('curry', function () {

    // Set curry here to use below
    let multiplyRecursive = (...args) => args.reduce((agg, num) => num * agg, 1),
        addRecursive = (...args) => args.reduce((agg, num) => num + agg, 0),
        divideR = (...args) => args.reduce((agg, num) => agg / num, args.shift());

    it ('should be of type function.', function () {
        expect(curry).to.be.instanceOf(Function);
    });

    it ('should return a function when called with or without args.', function () {
        expect(curry()).to.be.instanceOf(Function);
        expect(curry(99)).to.be.instanceOf(Function);
        expect(curry(() => {})).to.be.instanceOf(Function);
        expect(curry(console.log)).to.be.instanceOf(Function);
    });

    it ('should return a function that fails when no function is passed (as it\'s first param).', function () {
        assert.throws(curry(), Error);
        assert.throws(curry(99), Error);
    });

    it ('should return a properly curried function when correct arity for said function is met.', function () {
        let min8 = curry(Math.min, 8),
            max5 = curry(Math.max, 5),
            pow2 = curry(Math.pow, 2);

        // Expect functions
        [min8, max5, pow2].forEach(function (func) {
            expect(func).to.be.instanceOf(Function);
        });

        // Expect functions work correctly
        expect(min8(9)).to.equal(8);
        expect(min8(8)).to.equal(8);
        expect(min8(7)).to.equal(7);
        expect(max5(6)).to.equal(6);
        expect(max5(5)).to.equal(5);
        expect(max5(4)).to.equal(5);
        expect(pow2(2)).to.equal(4);
        expect(pow2(3)).to.equal(8);
        expect(pow2(4)).to.equal(16);
    });

    it ('should be able to correctly curry functions of different arity as long as their arity is met.', function () {
        let min = curry2(Math.min),
            max = curry2(Math.max),
            pow = curry2(Math.pow),
            min8 = curry(Math.min, 8),
            max5 = curry(Math.max, 5),
            pow2 = curry(Math.pow, 2),
            isValidTangentLen = curry((a, b, cSqrd) => pow(a, 2) + pow(b, 2) === cSqrd, 2, 2),
            random = curry((start, end) => Math.round(Math.random() * end + start), 0),
            expectedFor = (num) => min(8, max(5, pow(2, num)));

        // Expect functions returned for `curry` calls
        expect(isValidTangentLen).to.be.instanceOf(Function);

        // Expect functions returned for `curry` calls
        [min8, max5, pow2].forEach(function (func) {
            expect(func).to.be.instanceOf(Function);
        });

        // Expect `curry`ed functions to work as expected
        expect(isValidTangentLen(8)).to.equal(true);
        expect(isValidTangentLen(21)).to.equal(false);

        // Expect `curry`ed functions to work as expected
        [8,5,3,2,1,0, random(89), random(55), random(34)].forEach(function (num) {
            let composed = compose(min8, max5, pow2);
            expect(composed(num)).to.equal(expectedFor(num));
        });
    });

    it ('should enforce `Placeholder` values when currying', function () {
        let add = curry(addRecursive),
            multiply = curry(multiplyRecursive),
            multiplyExpectedResult = Math.pow(5, 5);

        // Curry add to add 3 numbers
        expect(add(__, __, __)(1, 2, 3)).to.equal(6);
        expect(add(1, __, __)(2, 3)).to.equal(6);
        expect(add(1, 2, __)(3)).to.equal(6);
        expect(add(1, 2, 3)).to.equal(6);

        // Curry multiply and pass args in non-linear order
        expect(multiply(__, __, __, __, __)(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply(__, __, 5, __, __)(5, 5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply(5, __, 5, __, __)(5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply(5, __, 5, __, 5)(5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply(5, __, 5, 5, 5)(5)).to.equal(multiplyExpectedResult);
        expect(multiply(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);

        expect(add(__, __, __)(1, 2, 3, 5, 6)).to.equal(17);
        expect(add(__, 1, __)(2, 3, 5, 6)).to.equal(17);
        expect(add(__, 1, 2)(3, 5, 6)).to.equal(17);
        expect(add(1, 2, 3, 5, 6)).to.equal(17);

    });

    it ('should respect argument order and placeholder order.', function () {
        // Curry divideR to divde 3 or more numbers
        expect(curry(divideR, 25, 5)).to.be.instanceOf(Function);
        expect(curry(divideR, __, 625, __)(3125, 5)).to.equal(1);
        expect(curry(divideR, Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
    });

});

/**
 * Created by elyde on 11/25/2016.
 */

describe('curryN', function () {

    // Set curry here to use below
    let multiplyRecursive = (...args) => args.reduce((agg, num) => num * agg, 1),
        addRecursive = (...args) => args.reduce((agg, num) => num + agg, 0),
        divideR = (...args) => args.reduce((agg, num) => agg / num, args.shift());

    it ('should be of type function.', function () {
        expect(curryN).to.be.instanceOf(Function);
    });

    it ('should return a function that throws an error when no arguments are passed.', function () {
        let result = curryN();
        expect(result).to.be.instanceOf(Function);
        assert.throws(result, Error);
    });

    it ('should enforce `Placeholder` values when currying', function () {
        let add3Nums = curryN(addRecursive, 3),
            multiply5Nums = curryN(multiplyRecursive, 5),
            multiplyExpectedResult = Math.pow(5, 5);

        // Curry add to add 3 numbers
        expect(add3Nums(__, __, __)(1, 2, 3)).to.equal(6);
        expect(add3Nums(1, __, __)(2, 3)).to.equal(6);
        expect(add3Nums(1, 2, __)(3)).to.equal(6);
        expect(add3Nums(1, 2, 3)).to.equal(6);

        // Curry multiply and pass args in non-linear order
        expect(multiply5Nums(__, __, __, __, __)(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(__, __, 5, __, __)(5, 5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(5, __, 5, __, __)(5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(5, __, 5, __, 5)(5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(5, __, 5, 5, 5)(5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);

    });

    it ('should pass in any values passed the arity when executing the curried function', function () {
        let add3Nums = curryN(addRecursive, 3);

        // Curry add to add 3 numbers
        expect(add3Nums(__, __, __)(1, 2, 3)).to.equal(6);
        expect(add3Nums(1, __, __)(2, 3)).to.equal(6);
        expect(add3Nums(1, 2, __)(3)).to.equal(6);
        expect(add3Nums(1, 2, 3)).to.equal(6);

        // Curry `add` to add any numbers passed required arity
        expect(add3Nums(__, __, __)(1, 2, 3, 5, 6)).to.equal(17);
        expect(add3Nums(__, 1, __)(2, 3, 5, 6)).to.equal(17);
        expect(add3Nums(__, 1, 2)(3, 5, 6)).to.equal(17);
        expect(add3Nums(1, 2, 3, 5, 6)).to.equal(17);
    });

    it ('should respect the passed in "executeArity" (shouldn\'t be called to passed in arity length is reached', function () {
        let multiply5Nums = curryN(multiplyRecursive, 5),
            multiplyExpectedResult = Math.pow(5, 5),
            argsToTest = [
                [5, 5, 5, 5, 5],
                [5, 5, 5, 5],
                [5, 5, 5],
                [5, 5],
                [5]
            ],
            partiallyAppliedResults = [
                multiply5Nums(__, __, __, __, __),
                multiply5Nums(__, __, 5, __, __),
                multiply5Nums(5, __, 5, __, __),
                multiply5Nums(5, __, 5, __, 5),
                multiply5Nums(5, __, 5, 5, 5)
            ];

        // Curry multiply and pass args in non-linear order
        argsToTest.forEach(function (args, index) {
            expect(partiallyAppliedResults[index]).to.be.instanceOf(Function);
            expect(partiallyAppliedResults[index].apply(null, args)).to.equal(multiplyExpectedResult);
        });

    });

    it ('should respect argument order and placeholder order.', function () {
        let divideC = curryN(divideR, 3);

        // Curry divideR to divde 3 or more numbers
        expect(divideC(25, 5)).to.be.instanceOf(Function);
        expect(divideC(__, 625, __)(3125, 5)).to.equal(1);
        expect(divideC(Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
    });

});

/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by elyde on 11/25/2016.
 */

describe ('Object Combinators', function () {

    describe('complement', function () {
        it('should be a function', function () {
            expectFunction(complement);
        });
        it('should return an object with only properties not found in the first obj', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {d: 4},
                subj3 = {e: 5, f: 6, g: 7},
                result = complement(subj1, subj2, subj3);
            [subj2, subj3].forEach(function (subj) {
                Object.keys(subj).forEach(key => {
                    expectEqual(result[key], subj[key]);
                });
            });
            Object.keys(subj1).forEach(key => {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('difference', function () {

        it('should be a function', function () {
            expectFunction(difference);
        });

        it('should return all the props from obj1 that aren\'t in obj2', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {d: 4},
                result = difference(subj1, subj2);
            Object.keys(subj1).forEach(key => {
                expectEqual(result[key], subj1[key]);
            });
            Object.keys(subj2).forEach(key => {
                expectFalse(result.hasOwnProperty(key));
            });
        });

    });

    describe('union', function () {
        it('should be a function', function () {
            expectFunction(union);
        });
        it ('should return an object containing all properties from the two objects passed in', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {e: 5, f: 6, g: 7},
                result = union(subj1, subj2);
            [subj2, subj1].forEach(function (subj) {
                Object.keys(subj).forEach(key => {
                    expectEqual(result[key], subj[key]);
                });
            });
        });
    });

    describe('intersect', function () {
        it('should be a function', function () {
            expectFunction(union);
        });
        it ('should return an object that contains values from both passed in objects', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {a: 5, b: 6, c: 7},
                result = intersect(subj1, subj2);
            Object.keys(subj2).forEach(key => {
                expectEqual(result[key], subj2[key]);
            });
        });
    });

});

/**
 * Created by edlc on 12/11/16.
 */
/**
 * Created by elyde on 12/10/2016.
 */

describe('functor.Apply', function () {

    let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
        expectFunctor = value => expectInstanceOf(value, Functor),
        expectApply = value => expectInstanceOf(value, Apply);

    it('should return an new instance when called as a function', function () {
        let result = Apply();
        expectApply(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Apply();
        expectApply(result);
        expectFunctor(result);
    });

    describe ('Statics', function () {

    });


    describe('Interface', function () {
        let instance = Apply();
        ['map', 'ap'].forEach((key) => {
            it('should method #' + key, function () {
                expectFunction(instance[key]);
            });
        });
        it('should have a non-enumerated `value` property', function () {
            let propsDesc = Object.getOwnPropertyDescriptor(instance, 'value');
            expect(Object.keys(instance).length).to.equal(0);
            expect(propsDesc.enumerable).to.equal(false);
        });
    });

    describe('#map', function () {
        it('should return a new instance of Functor', function () {
            let functor = Apply(99),
                result = functor.map(num => num * 2);
            expectApply(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Apply(99).map(num => num * 2);
            expectApply(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#ap', function () {
        it('should map incoming functor over it\'s value', function () {
            let instance = Apply(add(1)),
                result = instance.ap(Apply(99));
            expectFunctor(result);
            expectApply(result);
            expect(result.value).to.equal(100);
        });
    });

});

/**
 * Created by edlc on 12/11/16.
 */
/**
 * Created by elyde on 12/10/2016.
 */

describe('functor.Applicative', function () {

    let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
        expectFunctor = value => expectInstanceOf(value, Functor),
        expectApply = value => expectInstanceOf(value, Apply),
        expectApplicative = value => expectInstanceOf(value, Applicative),
        expectValue = (value, expectedValue) => expect(value).to.equal(expectedValue);

    it('should return an new instance when called as a function', function () {
        let result = Applicative();
        expectApplicative(result);
        expectApply(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Applicative();
        expectApplicative(result);
        expectApply(result);
        expectFunctor(result);
    });

    describe('Statics', function () {
        it('should have a static `of` property that acts as unit.', function () {
            let result = Applicative.of(multiply(4)).ap(Applicative(25));
            expectFunction(Applicative.of);
            expectApplicative(Applicative.of());
            expectApply(result);
            expectValue(result.value, 100);
        });
    });

    describe('Interface', function () {
        let instance = Applicative();
        ['map', 'ap'].forEach((key) => {
            it('should method #' + key, function () {
                expectFunction(instance[key]);
            });
        });
        it('should have a non-enumerated `value` property', function () {
            let propsDesc = Object.getOwnPropertyDescriptor(instance, 'value');
            expect(Object.keys(instance).length).to.equal(0);
            expect(propsDesc.enumerable).to.equal(false);
        });
    });

    describe('#map', function () {
        it('should return a new instance of Functor', function () {
            let functor = Apply(99),
                result = functor.map(num => num * 2);
            expectApply(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Apply(99).map(num => num * 2);
            expectApply(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#ap', function () {
        it('should map incoming functor over it\'s value', function () {
            let instance = Apply(add(1)),
                result = instance.ap(Apply(99));
            expectFunctor(result);
            expectApply(result);
            expect(result.value).to.equal(100);
        });
    });

});

/**
 * Created by elyde on 12/11/2016.
 */
/**
 * Created by edlc on 12/11/16.
 */

describe('functor.Bifunctor', function () {

    let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
        expectFunctor = value => expectInstanceOf(value, Functor),
        expectBifunctor = value => expectInstanceOf(value, Bifunctor);

    it('should return an new instance when called as a function', function () {
        let result = Bifunctor();
        expectBifunctor(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Bifunctor();
        expectBifunctor(result);
        expectFunctor(result);
    });

    describe('Interface', function () {
        let instance = Bifunctor();
        ['map', 'bimap'].forEach((key) => {
            it('should method #' + key, function () {
                expectFunction(instance[key]);
            });
        });
        it('should have a non-enumerated `value` and `value2` properties', function () {
            let propDesc1 = Object.getOwnPropertyDescriptor(instance, 'value'),
                propDesc2 = Object.getOwnPropertyDescriptor(instance, 'value2');
            expect(Object.keys(instance).length).to.equal(0);
            expect(propDesc1.enumerable).to.equal(false);
            expect(propDesc2.enumerable).to.equal(false);
        });
    });

    describe('#map', function () {
        it('should return a new instance of Functor', function () {
            let functor = Bifunctor(99),
                result = functor.map(num => num * 2);
            expectBifunctor(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Bifunctor(99).map(num => num * 2);
            expectBifunctor(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#bimap', function () {
        let functor = Bifunctor(21, 34),
            times2 = num => num * 2,
            result = functor.bimap(times2, times2);
        it('should return a new instance of Functor', function () {
            expectBifunctor(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            expectBifunctor(result);
            expectFunctor(result);
            expect(result.value).to.equal(21 * 2);
            expect(result.value2).to.equal(34 * 2);
        });
    });

});

/**
 * Created by edlc on 12/11/16.
 */
/**
 * Created by elyde on 12/10/2016.
 */

describe('functor.Chain', function () {

    let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
        expectFunctor = value => expectInstanceOf(value, Functor),
        expectApply = value => expectInstanceOf(value, Apply),
        expectChain = value => expectInstanceOf(value, Chain);

    it('should return an new instance when called as a function', function () {
        let result = Chain();
        expectChain(result);
        expectApply(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Chain();
        expectChain(result);
        expectApply(result);
        expectFunctor(result);
    });

    describe('Interface', function () {
        let instance = Chain();
        ['map', 'chain'].forEach((key) => {
            it('should method #' + key, function () {
                expectFunction(instance[key]);
            });
        });
        it('should have a non-enumerated `value` property', function () {
            let propsDesc = Object.getOwnPropertyDescriptor(instance, 'value');
            expect(Object.keys(instance).length).to.equal(0);
            expect(propsDesc.enumerable).to.equal(false);
        });
    });

    describe('#map', function () {
        it('should return a new instance of Functor', function () {
            let functor = Chain(99),
                result = functor.map(num => num * 2);
            expectChain(result);
            expectApply(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Chain(99).map(num => num * 2);
            expectChain(result);
            expectApply(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#chain', function () {
        it('should map incoming function over it\'s value and flatten it result if it is nested within an ' +
            'instance of it\'s own type', function () {
            let addReturnsChain = value => Chain(add(1, value)),
                instance = Chain(99),
                result1 = instance.chain(addReturnsChain), // nested result
                result2 = instance.chain(add(1)); // un-nested result

            // Check results
            [result1, result2].forEach(result => {
                expectChain(result);
                expectApply(result);
                expectFunctor(result);
                expect(result.value).to.equal(100);
            });
        });
    });

});

/**
 * Created by elyde on 12/10/2016.
 */

describe ('functor.Functor', function () {
    let expectFunctor = value => expect(value).to.be.instanceOf(Functor);

    it ('should return an new instance when called as a function', function () {
        expectFunctor(Functor());
    });
    it ('should construct an instance of `Functor` when called with `new`', function () {
        expectFunctor(new Functor());
    });
    describe('#map', function () {
        it ('should be a method on instances', function () {
            let instance = Functor();
            expectFunctor(instance);
            expectFunction(instance.map);
        });
        it ('should return a new instance of Functor', function () {
            let functor = Functor(99),
                result = functor.map(num => num * 2);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it ('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Functor(99).map(num => num * 2);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });
});

/**
 * Created by edlc on 12/12/16.
 */

describe('monad.Maybe', function () {

    let expectMonad = value => expectInstanceOf(value, Monad),
        expectMaybe = value => expectInstanceOf(value, Maybe) && expectMonad(value),
        expectJust = value => expectInstanceOf(value, Just),
        expectNothing = value => expectInstanceOf(value, Nothing),
        monadInterface = ['ap', 'map', 'join', 'chain'];

    describe('Construction:', function () {

        it('should contain a `Nothing` when constructed using function syntax and passed in value is `null` or `undefined`', function () {
            let result = Maybe();
            expectMaybe(result);
            result.map(expectNothing);
        });

        it('should contain a `Just` when constructed using function syntax function and passed in value is not `null` and not `undefined`', function () {
            let result = Maybe('something');
            expectMaybe(result);
            result.map(expectJust);
        });

        it('should contain a `Nothing` when constructed with new and passed in value is `null` or `undefined`', function () {
            let result = new Maybe();
            expectMaybe(result);
            result.map(expectNothing);
        });

        it('should contain a `Just` when constructed with new and passed in value is not `null` and not `undefined`', function () {
            let result = new Maybe('something');
            expectMaybe(result);
            result.map(expectJust);
        });

    });

    describe('#Nothing', function () {
        let someInstance = Nothing();

        describe('Constructor', function () {
            it('should be a singleton instance even when call `new Nothing()`', function () {
                [new Nothing(), Nothing(), Nothing()].reduce((aggInstance, instance) => {
                    expectNothing(aggInstance);
                    expectEqual(aggInstance, instance);
                    return instance;
                }, new Nothing());
            });
        });

        monadInterface.forEach(key => {
            describe('#' + key, function () {
                it(`should have a \`${key}\` method`, function () {
                    expectFunction(someInstance[key]);
                });
                it('should return a singleton instance of `Nothing`', function () {
                    let result = someInstance[key]();
                    expectNothing(result);
                    expectEqual(result, someInstance);
                });
            });
        });
    });

    describe('#Just', function () {

        describe('Constructor', function () {
            it('should return an instance when receiving any value  (when called with `new` and without `new`)', function () {
                [null, undefined, 99, 0, -1, true, false, [1, 2, 3], {}, {a: 'b'}, () => {
                }]
                    .forEach(value => {
                        expectJust(Just(value));
                        expectJust(new Just(value));
                    });
            });

            it('should return an instance of itself even when receiving no value (when called with `new` and without `new`)', function () {
                expectJust(Just());
                expectJust(new Just());
            });
        });

        describe('Statics', function () {
            it('#of (should act as unit)', function () {
                let result = Just.of(multiply(4)).ap(Just(25));
                expectFunction(Just.of);
                expectJust(Just.of());
                expectEqual(result.value, 100);
            });
        });

        describe('Interface ["' + (monadInterface.join('", "') + '"]'), function () {
            let someInstance = Just();
            monadInterface.forEach(key => {
                it(`should have a \`${key}\` method`, function () {
                    expectFunction(someInstance[key]);
                });
            });
        });

        describe('#map', function () {
            let someFn = value => value.toString();
            it('should return nothing when contained value is `null` or `undefined`', function () {
                expectNothing(Just().map(someFn));
                expectNothing(Just(null).map(someFn));
                expectNothing(Just(undefined).map(someFn));
            });
            expectJust(Just(-1).map(someFn));
            expectJust(Just(0).map(someFn));
            expectJust(Just(1).map(someFn));
            [-1, 0, 1, true, false, [1, 2, 3], {}, {a: 'b'}, () => {}]
                .forEach(function (value) {
                    it('should return an instance of `Just` when contained value is ' +
                        '`' + value.toString() + '`', function () {
                        expectJust(Just(value).map(someFn));
                    });
                });
        });

        describe('#ap', function () {
            it('should map incoming functor over it\'s value', function () {
                let instance = Just(add(1)),
                    result = instance.ap(Just(99));
                expectJust(result);
                expectEqual(result.value, 100);
            });
        });

        describe('#chain', function () {
            it('should map incoming function over it\'s value and flatten it result if it is nested within an ' +
                'instance of it\'s own type', function () {
                let addReturnsJust = value => Just(add(1, value)),
                    instance = Just(99),
                    result1 = instance.chain(addReturnsJust), // nested result
                    result2 = instance.chain(add(1)); // un-nested result

                // Check results
                [result1, result2].forEach(result => {
                    expectJust(result);
                    expectEqual(result.value, 100);
                });
            });
        });

        describe('#join', function () {
            it('should remove one level of monadic structure on it\'s own type;  ' +
                'E.g., If it\'s inner value is of the same type.', function () {
                let innerMostValue = 5,
                    monad1 = Just(innerMostValue),
                    monad2 = Just(monad1),
                    monad3 = Just(monad2),
                    monad4 = Just(),
                    expectInnerValueEqual = (value, value2) => expectEqual(value, value2),
                    expectations = (result, equalTo) => {
                        expectJust(result);
                        expectInnerValueEqual(result.value, equalTo);
                    };
                expectations(monad1.join(), innerMostValue);
                expectations(monad2.join(), innerMostValue);
                expectations(monad3.join(), monad1);
                expectations(monad4.join(), undefined);
            });
        });

    });

    describe('#maybe', function () {
        it ('should be a function', function () {
            expectFunction(maybe);
        });
        it ('should return the `left` when passed in functor maps to a functor with a value of ' +
            '`null` or `undefined` (or if it is `Nothing`) and it should return the value contained' +
            'within the passed in functor otherwise', function () {
            [[maybe(99, (value => value * 2), Nothing()), 99],
             [maybe(99, (value => value * 2), Just(100)), 200],
             [maybe(99, (value => value * 2), Just(null)), 99],
             [maybe(99, (value => value * 2), Just()), 99],
             [maybe(99, (value => value * 2), Maybe(99)), 198]
            ].forEach(tuple => {
                expectEqual(tuple[0], unwrapMonad(tuple[1]));
            });
        });
    });

});

/**
 * Created by edlc on 12/12/16.
 */

describe('monad.Monad', function () {

    let expectFunctor = value => expectInstanceOf(value, Functor),
        expectApply = value => expectInstanceOf(value, Apply),
        expectApplicative = value => expectInstanceOf(value, Applicative),
        expectChain = value => expectInstanceOf(value, Chain),
        expectMonad = value => compose(expectInstanceOf(__, Monad), expectChain, expectApplicative, expectApply, expectFunctor);

    describe('Construction', function () {

        it('should return `Monad` when called as a function and passed in value is `null` or `undefined`', function () {
            let result = Monad();
            expectMonad(result);
        });

        it('should return `Monad` when called as a function and passed in value is not `null` and not `undefined`', function () {
            let result = Monad('something');
            expectMonad(result);
        });

        it('should return `Monad` when called with new and passed in value is `null` or `undefined`', function () {
            let result = new Monad();
            expectMonad(result);
        });

        it('should return `Monad` when called with new and passed in value is not `null` and not `undefined`', function () {
            let result = new Monad('something');
            expectMonad(result);
        });

    });

    describe('Statics', function () {
        it('should have a static `of` property that acts as unit.', function () {
            let result = Monad.of(multiply(4)).ap(Monad(25));
            expectFunction(Monad.of);
            expectMonad(Monad.of());
            expectMonad(result);
            expectEqual(result.value, 100);
        });
    });

    describe('Interface', function () {
        let instance = Monad();
        ['map', 'ap', 'chain', 'join'].forEach(key => {
            it(`should have a "${key}" method`, function () {
                expectFunction(instance[key]);
            });
        });
    });

    describe('#map', function () {

        it('should be a method on instances', function () {
            let instance = Monad();
            expectMonad(instance);
            expectFunction(instance.map);
        });

        it('should return a new instance of Functor', function () {
            let functor = Monad(99),
                result = functor.map(num => num * 2);
            expectMonad(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });

        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Monad(99).map(num => num * 2);
            expectMonad(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#ap', function () {
        it('should map incoming functor over it\'s value', function () {
            let instance = Monad(add(1)),
                result = instance.ap(Monad(99));
            expectMonad(result);
            expectEqual(result.value, 100);
        });
    });

    describe('#chain', function () {
        it('should map incoming function over it\'s value and flatten it result if it is nested within an ' +
            'instance of it\'s own type', function () {
            let addReturnsChain = value => Monad(add(1, value)),
                instance = Monad(99),
                result1 = instance.chain(addReturnsChain), // nested result
                result2 = instance.chain(add(1)); // un-nested result

            // Check results
            [result1, result2].forEach(result => {
                expectMonad(result);
                expectEqual(result.value, 100);
            });
        });
    });

    describe('#join', function () {
        it('should remove one level of monadic structure on it\'s own type;  ' +
            'E.g., If it\'s inner value is of the same type.', function () {
            let innerMostValue = 5,
                monad1 = Monad(innerMostValue),
                monad2 = Monad(monad1),
                monad3 = Monad(monad2),
                monad4 = Monad(),
                expectInnerValueEqual = (value, value2) => expectEqual(value, value2),
                expectations = (result, equalTo) => {
                    expectMonad(result);
                    expectInnerValueEqual(result.value, equalTo);
                };
            expectations(monad1.join(), innerMostValue);
            expectations(monad2.join(), innerMostValue);
            expectations(monad3.join(), monad1);
            expectations(monad4.join(), undefined);
        });
    });

});
