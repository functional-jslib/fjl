/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import Role from '../example-data-structures/permissions/Role';
import {expectTrue, hasOwnProperty, expectInstanceOf} from './../helpers';
import {assert, expect} from 'chai';

describe ('Role', function () {
    describe ('construction', function () {
        it ('should require a `roleId` to pass construction', function () {
            assert.throws(Role, TypeError);
        });
        it ('should pass construction successfully when called as a function and supplying a `roleId`', function () {
            expectInstanceOf(Role('helloWorld'));
        });
        it ('should pass construction successfully when called with `new` and supplying a `roleId`', function () {
            expectInstanceOf(new Role('helloWorld'));
        });
    });
    describe ('properties', function () {
        let instance = new Role('hello');
        ['roleId', 'parents', 'children'].forEach(key => {
            it ('should have an own property "' + key + '"', function () {
                expectTrue(hasOwnProperty(instance, key));
            });
        });
    });
});
