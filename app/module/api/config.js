"use strict";

module.exports = function() {
	return ({
		dependencies: {},
		route: [
			'config/node.js'
		],
		cdn: [],
		import: [
			{
				module: 'generic',
				as: 'db',
				path: '/entity/util/db.js'
			},
			{
				module: 'generic',
				as: 'respond',
				path: '/entity/respond.js'
			}
		]
	});
};
