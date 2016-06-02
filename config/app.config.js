var variableConfig = require('./variable.config');
var path = require('path');

module.exports = {
    server: {
        src_lint: path.join(variableConfig.src, variableConfig.server, variableConfig.server_src),
        src: [
            path.join(variableConfig.src, variableConfig.server, variableConfig.server_src),
            path.join(variableConfig.ts)],
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
        test: [path.join(variableConfig.dist, variableConfig.client, variableConfig.client_test)],
        src_watch: [path.join(variableConfig.src, variableConfig.client, variableConfig.client_src),
            path.join(variableConfig.src, variableConfig.client, '**/*.scss'),
            './gulpfile.js',
            path.join('config', '**/*.js')],
        dist: path.join(variableConfig.dist, variableConfig.client),
        src_sass: [path.join(variableConfig.src, variableConfig.client, 'app.scss')],
        dist_sass: path.join(variableConfig.dist, variableConfig.client)
    }
}