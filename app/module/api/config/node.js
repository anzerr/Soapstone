"use strict";

module.exports = function() {
	return ([
		{
			method: ['get'],
			path: '/node',
			action: {
				controller: 'node',
				method: 'get'
			}
		},
		{
			method: ['post'],
			path: '/node',
			action: {
				controller: 'node',
				method: 'add'
			}
		},
		{
			method: ['delete'],
			path: '/node',
			action: {
				controller: 'node',
				method: 'remove'
			}
		}
	]);
};
