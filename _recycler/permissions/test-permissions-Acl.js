/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import Role from '../example-data-structures/permissions/Role';
import Resource from '../example-data-structures/permissions/Resource';
import Acl from '../example-data-structures/permissions/Acl';
import {expectTrue, hasOwnProperty, expectInstanceOf} from './../helpers';
import {assert, expect} from 'chai';

describe ('Acl', function () {
    describe ('construction', function () {
        it ('should require a `config` to pass construction', function () {
            assert.throws(Acl, TypeError);
        });
        it ('should pass construction successfully when called as a function and supplying a `config`', function () {
            expectInstanceOf(Acl({}));
        });
        it ('should pass construction successfully when called with `new` and supplying a `config`', function () {
            expectInstanceOf(new Acl({}));
        });
    });
    describe ('properties', function () {
        let instance = new Acl('hello');
        ['roles', 'resources', 'rules'].forEach(key => {
            it ('should have an own property "' + key + '"', function () {
                expectTrue(hasOwnProperty(instance, key));
            });
        });
    });
});
