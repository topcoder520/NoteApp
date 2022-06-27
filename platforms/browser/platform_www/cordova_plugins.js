cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/cordova-sqlite-storage/node_modules/cordova-sqlite-storage-dependencies/sql-asm-memory-growth.js",
        "id": "cordova-sqlite-storage.sql",
        "pluginId": "cordova-sqlite-storage",
        "runs": true
    },
    {
        "file": "plugins/cordova-sqlite-storage/src/browser/SQLiteProxy.js",
        "id": "cordova-sqlite-storage.SQLiteProxy",
        "pluginId": "cordova-sqlite-storage",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-sqlite-storage": "6.0.0"
}
// BOTTOM OF METADATA
});