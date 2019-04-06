import {apply} from '../../src/jsPlatform/function';
import {keys} from '../../src/jsPlatform/object';
import {unfoldr} from '../../src/list';
import {
    createTypedDescriptor,
    toEnumerableDescriptor,
    defineProp,
    defineProps,
    defineEnumProp,
    defineEnumProps
}
    from '../../src/object/defineProp';

describe ('#object.createTypedDescriptor', function () {
    const someTarget = {},
        exampleNumberDescriptor = createTypedDescriptor(Number, someTarget, 'someNum'),
        result = exampleNumberDescriptor;

    it ('should return a descriptor with a setter and a getter', function () {
        const ks = keys(result);
        expect(ks.length).toEqual(2);
        expect(result.hasOwnProperty('get')).toEqual(true);
        expect(result.hasOwnProperty('set')).toEqual(true);
    });

    it ('should return a descriptor for whom\'s getter and setter functions' +
        'return and/or set the value for said descriptor.', function () {
        expect(result.set(99)).toEqual(undefined);
        expect(result.get()).toEqual(99);
    });

    it ('should return a descriptor with a setter that throws an `Error` when ' +
        'passed in value to be set is not of the defined type.', function () {
        expect(() => result.set('not expected type')).toThrow(Error);
    });

    it ('should return a descriptor that retains it\'s value even after ' +
        'throwing a `setter` error (for incorrect type being passed in to `set`).', function () {
        expect(() => result.set('not expected type')).toThrow(Error);
        expect(result.get()).toEqual(99);
    });

    it ('should return a descriptor that doesn\'t expose internally stored value for ' +
        'it\'s defined property.', function () {
        const ks = keys(result);
        expect(ks.length).toEqual(2);
        expect(result.hasOwnProperty('get')).toEqual(true);
        expect(result.hasOwnProperty('set')).toEqual(true);
    });
});

describe ('#object.toEnumerableDescriptor', function () {
    const descriptor = toEnumerableDescriptor([{}, {}])[1];

    it ('should return an object with an `enumerable` property set to `true`', function () {
        expect(descriptor.hasOwnProperty('enumerable')).toEqual(true);
        expect(descriptor.enumerable).toEqual(true);
    });

    it ('should throw an error when no descriptor is passed in `TargetDescriptorPair`', function () {
        // @ts-ignore
        expect(() => toEnumerableDescriptor([])).toThrow(Error);
        // @ts-ignore
        expect(() => toEnumerableDescriptor([1]).toThrow(Error));
    });
});

describe ('#object.defineProp', function () {
    const someTarget = {},
        propName = 'someNum',
        [target, descriptor] = defineProp(Number, [someTarget], propName);
    it ('should return a `target` and `descriptor` pair (tuple)', function () {
        expect(target).toEqual(someTarget);
        expect(!!descriptor).toEqual(true);
    });
    it ('should define property `propName` on `target`', function () {
        expect(target.hasOwnProperty(propName)).toEqual(true);
    });
    it ('should return a target whose defined `propName` throws an error when ' +
        'the wrong type is passed in', function () {
        expect(() => { target[propName] = 'some value'; }).toThrow(Error);
    });
    it ('should return a target whose defined `propName` doesn\'t throw' +
        'an error when the correct type of value is passed in', function () {
        target[propName] = 99;
        expect(target[propName]).toEqual(99);
    });
    it ('should allow the user to pass in his/her own `descriptor`', function () {
        const somePropName = 'somePropName',
            someValue = (new Date()).getTime(),
            customDescriptor = {
                value: someValue,
                enumerable: true
            },
            [target2, descriptor2] = defineProp(Number, [someTarget, customDescriptor], somePropName);
        expect(() => { target2[somePropName] = 99; }).toThrow(Error);
        expect(target2[somePropName]).toEqual(someValue);
        expect(descriptor2).toEqual(customDescriptor);
        expect(descriptor2.enumerable).toEqual(true);
    });
});

describe ('#object.defineEnumProp', function () {
    const someTarget = {},
        propName = 'someNum',
        [target, descriptor] = defineEnumProp(Number, [someTarget], propName);
    it ('should return a `target` and `descriptor` pair (tuple)', function () {
        expect(target).toEqual(someTarget);
        expect(!!descriptor).toEqual(true);
    });
    it ('should define property `propName` on `target`', function () {
        expect(target.hasOwnProperty(propName)).toEqual(true);
    });
    it ('should set `enumerable` to `true` on returned descriptor', function () {
        expect(descriptor.enumerable).toEqual(true);
        expect(Object.getOwnPropertyDescriptor(target, propName).enumerable).toEqual(true);
    });
    it ('should return a target whose defined `propName` throws an error when ' +
        'the wrong type is passed in', function () {
        expect(() => { target[propName] = 'some value'; }).toThrow(Error);
    });
    it ('should return a target whose defined `propName` doesn\'t throw' +
        'an error when the correct type of value is passed in', function () {
        target[propName] = 99;
        expect(target[propName]).toEqual(99);
    });
    it ('should allow the user to pass in his/her own `descriptor`', function () {
        const somePropName = 'somePropName',
            someValue = (new Date()).getTime(),
            customDescriptor = {
                value: someValue,
                enumerable: false
            },
            [target2, descriptor2] = defineEnumProp(Number, [someTarget, customDescriptor], somePropName);
        expect(() => { target2[somePropName] = 99; }).toThrow(Error);
        expect(target2[somePropName]).toEqual(someValue);
        expect(descriptor2).toEqual(customDescriptor);
        expect(descriptor2.enumerable).toEqual(true);
    });
});

describe ('#object.defineProps', function () {
    const
        seedArgTuples = [
            [String, 'someStringProp'],
            [Number, 'someNumberProp'],
            [Boolean, 'someBooleanProp'],
            [Function, 'someFunctionProp'],
            [Array, 'someArrayProp']
        ],
        seedArgTupleCorrectIncorrectValues = [
            ['99 bottles..', 99],
            [99, 'should-be-number'],
            [false, 1],
            [function () {}, 99, 99],
            [[1, 2, 3, 4, 5], function () {}]
        ],
        seedTarget = seedArgTuples.reduce((agg, tuple) => {
                agg[tuple[1] + ''] = null;
                return agg;
            }, {}),
        seedPropNames = keys(seedTarget),
        generateTargetData = () => unfoldr((argTuples, ind, _out) => {
                const
                    _argTuples = argTuples.slice(0),
                    out = [_argTuples.slice(0), {}];
                if (!_out.length) {
                    return [out, _argTuples];
                }
                else if (_argTuples.length) {
                    _argTuples.pop();
                    return [out, _argTuples];
                }
                return undefined;
            },
            seedArgTuples);

    it ('data for tests should be in correct format', function () {
        // Test our test parameters
        expect(seedPropNames.length).toEqual(seedArgTuples.length);
        seedPropNames.forEach((name, ind) => {
            expect(seedArgTuples[ind][1]).toEqual(name);
        });
        expect(seedPropNames.length).toEqual(seedArgTuples.length);
    });

    it ('should be able to define many props on given target with only argTuples of length `2`', function () {
        generateTargetData().forEach(args => {
            // log(args);
            const target = defineProps.apply(null, args),
                propNames = args[0].map(x => x[1]);

            // log(propNames, '\n', target);

            // Ensure targets have props set
            propNames.forEach(name => {
                expect(target.hasOwnProperty(name)).toEqual(true);
            });
        });
    });

    it ('should have defined properties that throw errors when they are set to the wrong type' +
        'and no errors when set to the correct type', function () {
        generateTargetData().forEach(args => {
            // log(args);
            const target = defineProps.apply(null, args),
                propNames = args[0].map(x => x[1]);

            // log(propNames, '\n', target);

            // Ensure targets have props set
            propNames.forEach((name, ind) => {
                const [correct, inCorrect] = seedArgTupleCorrectIncorrectValues[ind];

                // Ensure prop exists
                expect(target.hasOwnProperty(name)).toEqual(true);

                // Ensure setter obeys type rule
                expect(() => { target[name] = inCorrect; }).toThrow(Error);

                // Ensure setter obeys type rule
                expect(target[name] = correct).toEqual(correct);
            });
        });
    });

    it ('should return target with defined properties from operation', function () {
        generateTargetData().forEach(args => {
            // log(args);
            const target = apply(defineProps, args),
                argKeyNames = args[0].map(pair => pair[1]);
            expect(target).toBeInstanceOf(Object);
            argKeyNames.forEach(key => {
                const propDescriptor = Object.getOwnPropertyDescriptor(target, key);
                expect(['set', 'get'].every(k => propDescriptor[k] instanceof Function));
            });
        });
    });

    it ('should be able to set types with argTuples of length of `3` (containing a `defaultValue`)', function () {
        generateTargetData().map(argTuple => {
            const [args, target] = argTuple;
            // log(argTuple);
            // Return new version of `argTuple` (seeded with `defaultValue`)
            return [
                // Add `defaultValue` to arg lists
                args.map((argSet, ind) => {
                    const [TypeRef, propName] = argSet,
                        [correct] = seedArgTupleCorrectIncorrectValues[ind];
                    return [TypeRef, propName, correct];
                }),
                target
            ];
        }).forEach(args => {
            // log(args);
            const target = apply(defineProps, args),
                argKeyNames = args[0].map(([_, key]) => key);
            expect(target).toBeInstanceOf(Object);
            argKeyNames.forEach(key => {
                const propDescriptor = Object.getOwnPropertyDescriptor(target, key);
                expect(['set', 'get'].every(k => propDescriptor[k] instanceof Function));
            });
        });
    });

});

describe ('#object.defineEnumProps', function () {
    const
        seedArgTuples = [
            [String, 'someStringProp'],
            [Number, 'someNumberProp'],
            [Boolean, 'someBooleanProp'],
            [Function, 'someFunctionProp'],
            [Array, 'someArrayProp']
        ],
        seedArgTupleCorrectIncorrectValues = [
            ['99 bottles..', 99],
            [99, 'should-be-number'],
            [false, 1],
            [function () {}, 99, 99],
            [[1, 2, 3, 4, 5], function () {}]
        ],
        seedTarget = seedArgTuples.reduce((agg, tuple) => {
            agg[tuple[1] + ''] = null;
            return agg;
        }, {}),
        seedPropNames = keys(seedTarget),
        generateTargetData = () => unfoldr((argTuples, ind, _out) => {
                const
                    _argTuples = argTuples.slice(0),
                    out = [_argTuples.slice(0), {}];
                if (!_out.length) {
                    return [out, _argTuples];
                }
                else if (_argTuples.length) {
                    _argTuples.pop();
                    return [out, _argTuples];
                }
                return undefined;
            },
            seedArgTuples);

    it ('data for tests should be in correct format', function () {
        // Test our test parameters
        expect(seedPropNames.length).toEqual(seedArgTuples.length);
        seedPropNames.forEach((name, ind) => {
            expect(seedArgTuples[ind][1]).toEqual(name);
        });
        expect(seedPropNames.length).toEqual(seedArgTuples.length);
    });

    it ('should be able to define many enum props on given target with only argTuples of length `2`', function () {
        generateTargetData().forEach(args => {
            // log(args);
            const target = apply(defineEnumProps, args),
                propNames = args[0].map(([_, name]) => name);

            // log(propNames, '\n', target);

            // Ensure targets have enumerable props set
            propNames.forEach(name => {
                expect(target.hasOwnProperty(name)).toEqual(true);
                expect(Object.getOwnPropertyDescriptor(target, name).enumerable)
                    .toEqual(true);
            });
        });
    });

    it ('should have defined properties that throw errors when they are set to the wrong type' +
        'and no errors when set to the correct type', function () {
        generateTargetData().forEach(args => {
            // log(args);
            const target = apply(defineEnumProps, args),
                propNames = args[0].map(([_, name]) => name);

            // log(propNames, '\n', target);

            // Ensure targets have enumerable props set
            propNames.forEach((name, ind) => {
                const [correct, inCorrect] = seedArgTupleCorrectIncorrectValues[ind];

                // Ensure prop exists
                expect(target.hasOwnProperty(name)).toEqual(true);

                // Ensure prop is enumerable
                expect(Object.getOwnPropertyDescriptor(target, name).enumerable)
                    .toEqual(true);

                // Ensure setter obeys type rule
                expect(() => { target[name] = inCorrect; }).toThrow(Error);

                // Ensure setter obeys type rule
                expect(target[name] = correct).toEqual(correct);
            });
        });
    });

    it ('should return target and descriptor tuples from operation', function () {
        generateTargetData().forEach(args => {
            // log(args);
            const target = apply(defineEnumProps, args),
                propNames = args[0].map(([_, name]) => name);
            expect(target).toBeInstanceOf(Object);
            propNames.forEach(name => {
                const propDescript = Object.getOwnPropertyDescriptor(target, name);
                expect(propDescript.enumerable).toEqual(true);
                expect(['set', 'get'].every(key => propDescript[key] instanceof Function));
            });
        });
    });

    it ('should be able to set types with argTuples of length of `3`(with [target, descriptor] tuple) ' +
        'and `4` (with defaultValue)', function () {
        generateTargetData().map(argTuple => {
            const [args, target] = argTuple;
            // log(argTuple);
            // Return new version of `argTuple` seeded `defaultValue`
            return [
                // Add `defaultValue` to arg lists
                args.map((argSet, ind) => {
                    const [correct, _] = seedArgTupleCorrectIncorrectValues[ind];
                    return argSet.concat([correct]);
                }),
                target
            ];

        }).forEach(args => {
            // log(args);

            const target = apply(defineEnumProps, args),
                propNames = args[0].map(([_, name]) => name);
            expect(target).toBeInstanceOf(Object);

            // log(propNames, '\n', target);

            // Ensure targets have enumerable props set
            propNames.forEach((name, ind) => {
                const [correct, inCorrect] = seedArgTupleCorrectIncorrectValues[ind];

                // Ensure prop exists
                expect(target.hasOwnProperty(name)).toEqual(true);

                // Ensure prop is enumerable
                expect(Object.getOwnPropertyDescriptor(target, name).enumerable)
                    .toEqual(true);

                // Ensure setter obeys type rule
                expect(() => { target[name] = inCorrect; }).toThrow(Error);

                // Ensure setter obeys type rule
                expect(target[name] = correct).toEqual(correct);
            });
        });
    });

});
