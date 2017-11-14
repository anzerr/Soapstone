"use strict";

$.require([
    //
], function(
    //
) {

    module.exports = function(self, path, res, url) {
        self.loadFile(path).then(function(file) {
            file.stream().then(function(stream) {
                var e = file.encode();
                if (e) {
                    res.set('content-encoding', e);
                }
                res.status(200).set('Content-Type', file.context()).set('Content-Length', file.size()).pipe(stream);
            });
        }, function(err) {
            console.log('error with file', path, err);
            if (url === '/') {
                res.status(200).json('');
            } else {
                res.status(404).json({error: 404, msg: 'file not found.'});
            }
        });
    };
});