"use strict";

$.require([
    //
], function(
    //
) {

    module.exports = function(moduleScope) {
        moduleScope.createScope('build').import(['mongo', 'hyperion']);
        moduleScope.createScope('api').import(['mongo']);
    };
});