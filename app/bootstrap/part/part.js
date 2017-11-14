"use strict";

$.require([
    'bootstrap!/part/exit.js',
	'bootstrap!/part/info.js',
	'bootstrap!/part/response.js',
	'bootstrap!/part/mongo.js',
	'bootstrap!/part/scope.js'
], function(
    exit,
	info,
	response,
	mongo,
	scope,
	cdn
) {

	module.exports = {
        exit: exit,
		info: info,
		response: response,
		mongo: mongo,
		scope: scope
	}
});