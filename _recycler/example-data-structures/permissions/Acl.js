/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

import {typeOf} from '../../../src/objectOps/typeOf';
import {difference as arrayDiff} from '../../../src/listOps';
import {errorIfNotType} from '../utils';
import Role from './Role';
import Resource from './Resource';

let contextName = Acl.name,
    // isResource = value => typeOfIs(Resource, value),
    // isRole = value => typeOfIs(Role, value),
    typeOrError = (name, value, type) => errorIfNotType(contextName, name, value, type);

function Acl (config) {
    if (!(this instanceof Acl)) {
        return new Acl(config);
    }
    var _roles,
        _resources,
        _rules;
    Object.defineProperties(this, {
        roles: {
            get: function () {
                return _roles;
            },
            set: function (value) {
                errorIfNotType(contextName, 'roles', value, Map);
                _roles = value;
            },
        },
        resources: {
            get: function () {
                return _resources;
            },
            set: function (value) {
                errorIfNotType(contextName, 'resources', value, Map);
                _resources = value;
            },
        },
        rules: {
            get: function () {
                return _rules;
            },
            set: function (value) {
                errorIfNotType(contextName, 'rules', value, Map);
                _rules = value;
            },
        }
    });
    if (config.roles) {
        this.addRoles(config.roles);
    }
    if (config.resources) {
        this.addResources(config.resources);
    }
    if (config.rules) {
        this.addRules(config.rules);
    }
}

function normalizeResource (resource) {
    switch (typeOf(resource)) {
        case 'Resource':
            return resource;
        case 'String':
            return new Resource(resource);
        default:
            return resource;
    }
}

function normalizeResources (resources) {
    return Array.isArray(resources) ? resources.map(normalizeResource) :
        [normalizeResource(resources)];
}

function normalizeRole (role) {
    switch (typeOf(role)) {
        case 'Role':
            return role;
        case 'String':
            return new Role(role);
        default:
            return role;
    }
}

function normalizeRoles (roles) {
    return Array.isArray(roles) ? roles.map(normalizeRole) : [normalizeRole(roles)];
}

function normalizePrivileges (privileges) {
    return [];
}

function getRoleId (role) {
    switch (typeOf(role)) {
        case 'String':
            return role;
        case 'Role':
        default:
            return role.roleId;
    }
}

function getResourceId (resource) {
    switch (typeOf(resource)) {
        case 'String':
            return resource;
        case 'Resource':
        default:
            return resource.resourceId;
    }
}

Acl.prototype = Object.create({
    addResources: function (resources) {
        Object.keys(resources).map(key => {
            switch (typeOf(resources[key])) {
                case 'String':
                    this.addResource(key, resources[key]);
                    break;
                case 'Array':
                    resources[key].forEach(parentKey => {
                        this.addResource(parentKey);
                    });
                    break;
                default:
                    this.addResource(key, resources[key]);
                    break;
            }
        });
        return this;
    },
    addResource: function (resource, parent) {
        let resourceToAdd = normalizeResource(resource),
            parentToAdd = normalizeResource(parent);
        typeOrError('addResource.resource', resourceToAdd, Resource);
        if (parentToAdd) {
            typeOrError('addResource.parent', parentToAdd, Resource);
            resourceToAdd.parent = parentToAdd;
        }
        this.resources.set(resourceToAdd.resourceId, resourceToAdd);
        return this;
    },
    addRole: function (role, parents) {
        let roleToAdd = normalizeRole(role),
            parentsToAdd = normalizeRole(parents);
        typeOrError('addRole.role', roleToAdd, Role);
        if (parentsToAdd) {
            typeOrError('addRole.parents', parentsToAdd, Array);
            roleToAdd.parents = parentsToAdd;
        }
        this.roles.set(roleToAdd.roleId, roleToAdd);
        return this;
    },
    allow: function (roles, resources, privileges, assert) {
        return this.setRule(
            Acl.OP_ADD, Acl.TYPE_ALLOW,
            roles, resources, privileges, assert
        );
    },
    deny: function (roles, resources, privileges, assert) {
        return this.setRule(
            Acl.OP_ADD, Acl.TYPE_DENY,
            roles, resources, privileges, assert
        );
    },
    hasResource: function (resource) {
        return this.resources.has(getResourceId(resource));
    },
    hasRole: function (role) {
        return this.roles.has(getRoleId(role));
    },
    inheritsResource: function (resource, inherits, fromDirectParent) {
        let _inheritsResourceId = getResourceId(inherits),
            retVal;
        if (resource.resourceId === _inheritsResourceId) {
            retVal = true;
        }
        else if (resource.parent) {
            retVal = this.inheritsResource(resource.parent, _inheritsResourceId, fromDirectParent);
        }
        else {
            retVal = false;
        }
        return retVal;
    },
    inheritsRole: function (resource, inherits, fromDirectParent) {
    },
    isAllowed: function (role, resource, privilege) {
    },
    removeAllowed: function (roles, resources, privileges) {
        return this.setRule(
            Acl.OP_REMOVE, Acl.TYPE_ALLOW,
            roles, resources, privileges
        );
    },
    removeDenied: function (roles, resources, privileges) {
        return this.setRule(
            Acl.OP_REMOVE, Acl.TYPE_DENY,
            roles, resources, privileges
        );
    },
    removeResource: function (resource) {
        this.resources.remove(getResourceId(resource));
        return this;
    },
    removeRole: function (role) {
        this.roles.remove(getRoleId(role));
        return this;
    },
    resetResources: function () {
        this.resources.clear();
        return this;
    },

    resetRoles: function () {
        this.roles.clear();
        return this;
    },

    setRule: function (operation, type, roles, resources, privileges, assert) {
        let _resources = normalizeResources(resources),
            _roles = normalizeRoles(roles),
            _privileges = normalizePrivileges(privileges);

        this[operation + 'Rule'](type, _roles, _resources, _privileges, assert);

        _roles.forEach(role => {
            if (!this.rules.has(role.roleId)) {
                return;
            }
        });
    },

    addRule: function (ruleType, role, resource, privileges = []) {
        let {allowed, denied} = role,
            {resourceId} = resource;
        allowed.set(resourceId, privileges);
        if (denied.has(resourceId)) {
            let privilegesDiff = arrayDiff(denied.get(resourceId), privileges);
            if (privilegesDiff.length > -1) {
                denied.set(resourceId, privilegesDiff);
            }
            else {
                denied.delete(resourceId);
            }
        }
        this.rules.set(role.roleId, role);
    }
});

Object.defineProperties(Acl, {
    getRoleId: {value: getRoleId, enumerable: true},
    getResourceId: {value: getResourceId, enumerable: true},
    normalizeRole: {value: normalizeRole, enumerable: true},
    normalizeResource: {value: normalizeResource, enumerable: true},
    OP_ADD: {
        value: 'add',
        enumerable: true
    },
    OP_REMOVE: {
        value: 'remove',
        enumerable: true
    },
    TYPE_ALLOW: {
        value: 'allow',
        enumerable: true
    },
    TYPE_DENY: {
        value: 'deny',
        enumerable: true
    }
});

export default Acl;
