var variableConfig = require('./variable.config');
var path = require('path');
module.exports = {
    server: {
        src_lint: path.join(variableConfig.src, variableConfig.server, variableConfig.server_src),
        src: [
            path.join(variableConfig.src, variableConfig.server, variableConfig.server_src),
            path.join(variableConfig.ts)
        ],
        test: path.join(variableConfig.dist, variableConfig.server, variableConfig.server_test),
        src_watch: [
            path.join(variableConfig.src, variableConfig.server, variableConfig.server_src),
            path.join(variableConfig.src, 'server.ts'),
            './gulpfile.js',
            path.join('config', '**/*.js')
        ],
        dist: path.join(variableConfig.dist, variableConfig.server),
        main: [path.join(variableConfig.dist, variableConfig.server, 'server.js')]
    },
    app: {
        src_lint: path.join(variableConfig.src, variableConfig.client, variableConfig.client_src),
        src: [path.join(variableConfig.src, variableConfig.client, variableConfig.client_src)],
        test: [
            // Polyfills.
            'node_modules/core-js/client/shim.min.js',

            // System.js for module loading
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',

            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            // RxJs.
            'node_modules/rxjs/**/*.js',
            'node_modules/rxjs/**/*.js.map',
            'node_modules/@angular/**/*.js',
            path.join(variableConfig.dist, variableConfig.client, variableConfig.client_test),
            'config/karma.main.js'
        ],
        src_watch: [path.join(variableConfig.src, variableConfig.client, variableConfig.client_src),
            path.join(variableConfig.src, variableConfig.client, '**/*.scss'),
            './gulpfile.js',
            path.join('config', '**/*.js')
        ],
        dist: path.join(variableConfig.dist, variableConfig.client),
        src_sass: [path.join(variableConfig.src, variableConfig.client, 'app.scss')],
        dist_sass: path.join(variableConfig.dist, variableConfig.client)
    },
    karamConfig: {
        file: path.join(__dirname, '..', 'karma.conf.js')
    }
}