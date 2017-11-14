"use strict";

module.exports = function($) {
    return $.require([
        'import!respond'
    ], function(
        respond
    ) {

        var obj = function() {};
        obj.prototype = $.extends('!controller', {
            get: function(data) {
                var d = data.body;
                if (!$.is.number(d.x) && !$.is.string(d.x)) {
                    return $.promise().reject(respond.code('E1001'));
                }
                data.body.x = Number(d.y);

                if (!$.is.number(d.y) && !$.is.string(d.y)) {
                    return $.promise().reject(respond.code('E1002'));
                }
                data.body.y = Number(d.y);

                if (!$.is.number(d.distance) && !$.is.string(d.distance)) {
                    return $.promise().reject(respond.code('E1003'));
                }
                data.body.distance = Number(d.distance);

                console.log(data.body);

                return (true);
            },

            add: function(data) {
                var d = data.body.node;
                if (!$.is.object(d)) {
                    return $.promise().reject(respond.code('E1004'));
                }

                if (!$.is.number(d.x) && !$.is.string(d.x)) {
                    return $.promise().reject(respond.code('E1004'));
                }
                data.body.node.x = Number(d.y);

                if (!$.is.number(d.y) && !$.is.string(d.y)) {
                    return $.promise().reject(respond.code('E1005'));
                }
                data.body.node.y = Number(d.y);

                if (!$.is.string(d.message) && $.defined(d.message)) {
                    return $.promise().reject(respond.code('E1007'));
                }

                if (!$.is.string(d.key) && $.defined(d.key)) {
                    return $.promise().reject(respond.code('E1008'));
                }


                if (!$.is.string(d.message) ) {
                    return $.promise().reject(respond.code('E1012'));
                }

                if (!$.is.array(d.type)) {
                    return $.promise().reject(respond.code('E1009'));
                }

                for (var i in d.type) {
                    if (!$.is.string(d.type[i])) {
                        return $.promise().reject(respond.code('E1010'));
                    }
                }

                return (true);
            },

            remove: function(data) {
                var d = data.body;

                if (!$.is.string(d.id)) {
                    return $.promise().reject(respond.code('E1011'));
                }

                if (!$.is.string(d.key)) {
                    return $.promise().reject(respond.code('E1012'));
                }

                return (true);
            }
        });

        return ({'static private': obj});
    });
};
