const appConfig = require('./config/app.config');
const path = require('path');
module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: appConfig.app.test,
        port: 9876,
        logLevel: config.LOG_INFO,
        colors: true,
        browsers: ['PhantomJS'],
        // Karma plugins loaded
        plugins: [ 
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher'
        ],
        // Coverage reporter generates the coverage
        reporters: ['progress', 'dots', 'coverage'],
        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        preprocessors: {
            'dist/**/!(*bdd).js': ['coverage']
        },
        exclude: [
            'node_modules/**/*spec.js'
        ],
        coverageReporter: {
            dir: 'coverage/',
            reporters: [{
                type: 'text-summary'
            }, {
                type: 'json',
                subdir: '.',
                file: 'coverage-final.json'
            }, {
                type: 'html'
            }]
        },
        singleRun: true
    });
}