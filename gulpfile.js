const gulp = require('gulp');
const mocha = require('gulp-mocha');
const ts = require("gulp-typescript");
const runSequence = require('run-sequence');
const filter = require('gulp-filter');
const tslint = require('gulp-tslint');
const server = require('gulp-express');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const vendorConfig = require('./config/vendor.config');
const appConfig = require('./config/app.config');
const jasmineBrowser = require('gulp-jasmine-browser');
const Server = require('karma').Server;

gulp.task('default', function() {
    runSequence('develop-client', 'develop-server');
});

/* SERVER */
gulp.task('compile-server', function() {
    return gulp.src(appConfig.server.src).pipe(ts({
        module: 'commonjs',
        target: 'es5'
    })).pipe(gulp.dest(appConfig.server.dist));
});

gulp.task('tslint-server', function() {
    return gulp.src(appConfig.server.src_lint)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('test-server', function() {
    return gulp.src(appConfig.server.test, {
            read: false
        })
        .pipe(mocha())
        .pipe(mocha({
            reporter: 'nyan'
        }));
});

gulp.task('watch-server', function() {
    return gulp.watch(appConfig.server.src_watch, function(event) {
        runSequence('tslint-server', 'compile-server', 'test-server');
        server.notify(event);
    });
});

gulp.task('run-server', function() {
    server.run(appConfig.server.main);
});
/* END SERVER */

/* CLIENT */
gulp.task('concat-client-vendor', function() {
    return gulp.src(vendorConfig.js.src)
        .pipe(concat(vendorConfig.js.name))
        .pipe(gulp.dest(vendorConfig.js.dest));
});

gulp.task('concat-client-css-vendor', function() {
    return gulp.src(vendorConfig.css.src)
        .pipe(concat(vendorConfig.css.name))
        .pipe(gulp.dest(vendorConfig.css.dest));
});

gulp.task('copy-client-font-vendor', function() {
    return gulp.src(vendorConfig.font.src)
        .pipe(gulp.dest(vendorConfig.font.dest));
});

gulp.task('compile-client', function() {
    return gulp.src(appConfig.app.src)
        .pipe(ts({
            target: 'es5',
            module: 'amd',
            moduleResolution: 'node',
            sourceMap: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            removeComments: false,
            noImplicitAny: false
        })).pipe(gulp.dest(appConfig.app.dist));
});

gulp.task('tslint-client', function() {
    return gulp.src(appConfig.app.src_lint)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('watch-client', function() {
    return gulp.watch(appConfig.app.src_watch, function(event) {
        runSequence('tslint-client', 'compile-client', 'compile-sass');
        server.notify(event);
    });
});

gulp.task('test-client', function(done) {
    new Server({
        configFile: appConfig.karamConfig.file,
        singleRun: true
    }, done).start();
});

gulp.task('compile-sass', function() {
    return gulp.src(appConfig.app.src_sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(appConfig.app.dist_sass));
});
/* END CLIENT */

/* BUILD */

gulp.task('watch', function() {
    return gulp.watch(['src/**/*.ts', 'src/**/*.scss', 'src/server.ts', './gulpfile.js', './config/**/*.js'], function(event) {
        runSequence('tslint-server', 'compile-server', 'test-server', 'tslint-client', 'compile-client', 'test-client', 'compile-sass');
        server.notify(event);
    });
});

gulp.task('develop-client', function() {
    runSequence('concat-client-vendor', 'concat-client-css-vendor', 'copy-client-font-vendor', 'tslint-client', 'compile-client', 'test-client', 'compile-sass');
});

gulp.task('develop-server', function() {
    runSequence('tslint-server', 'compile-server', 'test-server', 'run-server', 'watch');
});