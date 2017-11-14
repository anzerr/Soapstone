"use strict";

module.exports = function($) {
    return $.require([
        'import!db',
        'module!entity/util/config.js'
    ], function(
        db,
        config
    ) {

        var obj = function() {};
        obj.prototype = {
            db: new db({service: $.service('mongo'), prefix: config.prefix}),

            grid: function(x, y) {
                return [
                    Math.floor(x / config.grid),
                    Math.floor(y / config.grid)
                ];
            },

            zone: function(x, y, distance) {
                var g = this.grid(x, y), d = Math.floor(distance / config.grid), out = [];
                if (d == 0) {
                    return [g.join('.')];
                }
                for (var i = -d; i < d; i++) {
                    for (var v = -d; v < d; v++) {
                        out.push((g[0] + i) + '.' + (g[0] + v));
                    }
                }
                return (out);
            },

            distance: function(x1, y1, x2, y2) {
                var a = x1 - x2, b = y1 - y2;
                return Math.sqrt((a * a) + (b * b));
            },

            trim: function(data) {
                return {
                    id: data._id,
                    pos: data.pos,
                    shard: data.shard,
                    type: data.type,
                    meta: data.meta
                };
            },

            get: function(x, y, distance, type, shard) {
                var self = this, g = this.zone(x, y, distance), f = {
                    grid: {$in: g},
                    shard: shard || config.shard
                };
                if (type) {
                    f.type = {$in: type};
                }

                console.log(f);
                return this.db.find('node', f).then(function(res) {
                    var out = [];
                    for (var i in res) {
                        console.log(self.distance(x, y, res[i].pos.x, res[i].pos.y), distance, (self.distance(x, y, res[i].x, res[i].y) < distance));
                        if (self.distance(x, y, res[i].pos.x, res[i].pos.y) < distance) {
                            out.push(self.trim(res[i]));
                        }
                    }
                    return (out);
                }, function(err) {
                    return $.promise().reject(err);
                });
            },

            add: function(data) {
                var self = this, d = {
                    _id: $.key.short(),
                    grid: this.grid(data.x, data.y).join('.'),
                    pos: {x: data.x, y: data.y},
                    shard: data.shard || config.shard,
                    key: data.key || $.key.random(),
                    type: data.type || [],
                    meta: {
                        user: data.user || 'anon',
                        message: data.message,
                        rate: {}
                    }
                };

                return (this.db.insert('node', d).then(function() {
                    return (self.trim(d));
                }, function(err) {
                    return $.promise().reject(err);
                }));
            },

            remove: function(id, key) {
                return (this.db.remove('node', {_id: id, key: key}));
            }
        };

        return ({'static private': obj});
    });
};
