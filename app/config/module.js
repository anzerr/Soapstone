"use strict";

module.exports = function(config) {
	return ({
		repository: {
			modules: [
				/*{
					name: 'docker',
					repo: 'https://github.com/anzerr/Module_Docker.git',
					commit: 'd4d6e6954d70c3177bf7a3dc8bc54b56ba9a8a45'
				},
				{
					name: 'react',
					repo: 'https://github.com/anzerr/Module_react.git',
					commit: '5edfc0fad4f59961f98f58c42d4083853ac5c836'
				},
				{
					name: 'libary',
					repo: git + 'Module_Libary.git',
					commit: '7a8a5460e56c2a480ab6ddda589beb6e2d134e9e'
				}*/
				{
					name: 'generic',
					repo: 'https://github.com/anzerr/Module_Generic.git',
					commit: '24a5e76a8b211001c2edaad72cffed6195300d6f'
				}
			]
		},
		skipPrivate: config.skipPrivate || false,
		path: {
			module: config.path.app + '/module',
			remote: config.path.cache + '/module'
		},
		load: ['generic', 'api']
	});
};