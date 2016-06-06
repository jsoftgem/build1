// map tells the System loader where to look for things
var map = {
    'app': 'js', // 'dist',
    '@angular': '@angular',
    'angular2-in-memory-web-api': 'angular2-in-memory-web-api',
    'rxjs': 'rxjs'
};
// packages tells the System loader how to load when no filename and/or no extension
var packages = {
    app: {
        defaultExtension: 'js'
    },
    rxjs: {
        defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': {
        defaultExtension: 'js'
    },
};
var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
];
// Add package entries for angular packages
ngPackageNames.forEach(function(pkgName) {
    packages['@angular/' + pkgName] = {
        main: pkgName + '.umd.js',
        defaultExtension: 'js'
    };
});

var config = {
    map: map,
    packages: packages
}

System.config(config);

System.import('@angular/platform-browser/src/browser/browser_adapter')
    .then(function(browser_adapter) {
        browser_adapter.BrowserDomAdapter.makeCurrent();
    })
    .then(function() {
        return Promise.all(resolveTestFiles());
    })
    .then(function() {
        __karma__.start();
    }, function(error) {
        __karma__.error(error.stack || error);
    });

function onlySpecFiles(path) {
    return /\.bdd\.js$/.test(path);
}

function resolveTestFiles() {
    return Object.keys(window.__karma__.files) // All files served by Karma.
        .filter(onlySpecFiles)
        .map(function(moduleName) {
            // loads all spec files via their global module names (e.g.
            // 'base/dist/vg-player/vg-player.spec')
            return System.import(moduleName);
        });
}