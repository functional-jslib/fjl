/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import {errorIfNotType} from '../utils';

let contextName = Resource.name;

export default function Resource (resourceId, parent) {
    if (!(this instanceof Resource)) {
        return new Resource(resourceId, parent);
    }
    var _parent,
        _resourceId;
    Object.defineProperties(this, {
        parent: {
            get: function () {
                return _parent;
            },
            set: function (value) {
                errorIfNotType(contextName, 'parent', value, Resource);
                _parent = value;
            },
        },
        resourceId: {
            get: function () {
                return _resourceId;
            },
            set: function (value) {
                errorIfNotType(contextName, 'resourceId', value, String);
                _resourceId = value;
            },
        }
    });
    this.resourceId = resourceId;
    if (parent) {
        this.parent = parent;
    }
}
