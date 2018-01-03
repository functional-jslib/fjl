/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import Resource from '../example-data-structures/permissions/Resource';
import {expectTrue, hasOwnProperty, expectInstanceOf} from './../helpers';
import {assert, expect} from 'chai';

describe ('Resource', function () {
    describe ('construction', function () {
        it ('should require a `resourceId` to pass construction', function () {
            assert.throws(Resource, TypeError);
        });
        it ('should pass construction successfully when called as a _functionOps and supplying a `resourceId`', function () {
            expectInstanceOf(Resource('helloWorld'));
        });
        it ('should pass construction successfully when called with `new` and supplying a `resourceId`', function () {
            expectInstanceOf(new Resource('helloWorld'));
        });
    });
    describe ('properties', function () {
        let instance = new Resource('hello');
        ['resourceId', 'parent'].forEach(key => {
            it ('should have an own property "' + key + '"', function () {
                expectTrue(hasOwnProperty(instance, key));
            });
        });
    });
});
