"use strict";

module.exports = function($) {
    return $.require([
        //
    ], function(
        //
    ) {

        var node = {
            _id: '',
            grid: '1.1',
            pos: {
                x: 0,
                y: 0
            },
            shard: '',
            key: '',
            type: ['food', 'warning'],
            meta: {
                user: '',
                message: '',
                rate: {
                    good: 0,
                    bad: 0
                }
            }
        };

        // todo later
        var obj = function() {};
        obj.prototype = $.extends('!controller', {
            get: function(data) {
                return (true);
            },

            add: function(data) {
                return (true);
            }
        });

        return ({'static private': obj});
    });
};
