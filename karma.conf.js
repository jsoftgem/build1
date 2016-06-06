const appConfig = require('./config/app.config');
const path = require('path');
module.exports = function(config) {
    config.set({

        basePath: '.',

        frameworks: ['jasmine', 'systemjs'],

        files: appConfig.app.test,
        systemjs: {
            configFile: 'config/system.config.karma.js',
            paths: {
                'js': path.join(__dirname, 'dist', 'js'),
                '@angular': path.join(__dirname, 'node_modules', '@angular'),
                'angular2-in-memory-web-api': path.join(__dirname, 'node_modules', 'angular2-in-memory-web-api'),
                'rxjs/': path.join(__dirname, 'node_modules', 'rxjs')
            }
        },
        port: 9876,

        logLevel: config.LOG_INFO,

        colors: true,

        autoWatch: true,

        browsers: ['PhantomJS'],

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-systemjs'
        ],

        // Coverage reporter generates the coverage
        reporters: ['progress', 'dots', 'coverage'],

        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        preprocessors: {
            'dist/**/!(*bdd).js': ['coverage']
        },
        coverageReporter: {
            reporters: [{
                type: 'json',
                subdir: '.',
                file: 'coverage-final.json'
            }]
        },

        singleRun: true
    });
}