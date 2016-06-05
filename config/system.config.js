(function(global) {
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

    esriSystem.register([
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/widgets/Locate',
        'esri/layers/GraphicsLayer',
        "esri/geometry/Point",
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/TextSymbol',
        'esri/Graphic',
        'esri/widgets/Track',
        'esri/widgets/Compass',
        'esri/symbols/PictureMarkerSymbol',
        'dojo/domReady!'
    ], function() {
        // then bootstrap application
        System.import('app/boot')
            .then(null, console.error.bind(console));
    });

})(this);