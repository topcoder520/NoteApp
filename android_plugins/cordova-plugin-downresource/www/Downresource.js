var exec = require('cordova/exec');

var Downresource = {
    fetchFromURL: function (url, filepath, success, error) {
        exec(success, error, 'Downresource', 'fetchFromURL', [url, filepath]);
    }
};

module.exports = Downresource;