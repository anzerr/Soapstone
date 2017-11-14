"use strict";

$.require([
	'core!database/mongo.js',
	'core!/module.js',
    'core!/exit.js',
	'core!/server.js',
	'core!/serviceManager.js',

	'bootstrap!/part/part.js'
], function(
	mongo,
	module,
    exit,
	server,
	serviceManager,
	part
) {

	var e = new exit(), _s = {};
	part.exit(e, _s);
    part.info();
    var s = new server(), m = new module();

    var service = new serviceManager();
    _s.http = s.http({});
	_s.mongo = new mongo();

    var moduleScope = service.createScope('module').add({
        http: _s.http,
		exit: e,
        module: m
    });

	part.scope(moduleScope);

	part.mongo(_s.mongo).then(function(res) {
		for (var i in res) {
			console.log(i, 'connected');
			moduleScope.add(i, res[i]); // add db handle to module scopes
		}

		console.log('loading modules', $.config.get('module.load'));
		return (m.loadPlugin(service.scope('module')).load($.config.get('module.load')));
	}).then(function() {
		console.log('loaded modules');

		if ($.config.get('env.setup')) {
			setTimeout(function() {
				process.exit();
			}, 1000);
			return;
		}

		_s.http.api(function(req, res) {
			res.set({
				"Access-Control-Allow-Origin": req.headers().origin || "*",
				"X-Frame-Options": "SAMEORIGIN",
				"X-XSS-Protection": "1; mode=block",
				"X-Content-Type-Options": "nosniff",
				"Referrer-Policy": "no-referrer",
				//"Content-Security-Policy": "script-src 'self'",
				"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
				"Access-Control-Allow-Headers": "Cache-Control, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Range, md5, Content-Range",
				"Access-Control-Expose-Headers": "Cache-Control, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Range, md5, Content-Range"
			});
			part.response(this, m, req, res);
		});
    });
});