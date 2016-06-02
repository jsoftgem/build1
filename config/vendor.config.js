var path = require('path');
var configVariable = require(path.join(__dirname, 'variable.config'));
module.exports = {
    js: {
        src: ['node_modules/core-js/client/shim.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/esri-system-js/dist/esriSystem.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js'],
        dest: path.join(configVariable.dist, configVariable.vendor),
        name: 'public.js'
    },
    css: {
        src: ['node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.css'],
        dest: path.join(configVariable.dist, configVariable.vendor),
        name: 'public.css'
    },
    font: {
        src: ['node_modules/bootstrap/fonts/**/*'],
        dest: path.join(configVariable.dist, configVariable.vendor)
    }
}