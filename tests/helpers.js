/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {expect} from 'chai';

export function expectFunction (value) {
    return expect(value).to.be.instanceOf(Function)
}

export default {
    expectFunction
}
