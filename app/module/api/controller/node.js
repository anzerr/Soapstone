"use strict";

module.exports = function($) {
	return $.require([
		'module!entity/node.js',
		'module!entity/util/valid.js'
	], function(
		node,
		valid
	) {

		var obj = function() {};
		obj.prototype = $.extends('!controller', {
			get: $.midware([valid, 'get'], function(data) {
				var d = data.body, self = this;
				return node.get(d.x, d.y, d.distance, d.type, d.shard).then(function(res) {
					return (self.res().status(200).data(res));
				}, function(err) {
					return (self.res().status(500).data(err));
				});
			}),

			add: $.midware([valid, 'add'], function(data) {
				var self = this;
				return node.add(data.body.node).then(function(res) {
					return (self.res().status(200).data(res));
				}, function(err) {
					return (self.res().status(500).data(err));
				});
			}),

			remove: $.midware([valid, 'remove'], function(data) {
				var self = this;
				return node.remove(data.body.id, data.body.key).then(function(res) {
					return (self.res().status(200).data(res));
				}, function(err) {
					return (self.res().status(500).data(err));
				});
			})
		});

		return ({'static private': obj});
	});
};
