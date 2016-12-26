/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import {errorIfNotType} from '../utils';

let contextName = Role.name;

export default function Role (roleId, parents, children) {
    var _roleId,
        _parents,
        _children;

    Object.defineProperties(this, {
        roleId: {
            get: function () {
                return _roleId;
            },
            set: function (value) {
                errorIfNotType(contextName, 'roleId', value, String);
                _roleId = value;
            },
        },
        parents: {
            get: function () {
                return _parents;
            },
            set: function (value) {
                errorIfNotType(contextName, 'parents', value, Map);
                _parents = value;
            },
        },
        children: {
            get: function () {
                return _children;
            },
            set: function (value) {
                errorIfNotType(contextName, 'children', value, Map);
                _children = value;
            },
        }
    });

    this.roleId = roleId;

    if (parents) {
        this.parents = parents;
    }
    if (children) {
        this.children = children;
    }
}
