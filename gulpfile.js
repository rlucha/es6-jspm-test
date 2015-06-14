'use strict'

var gulp = require('gulp')
var jspm = require('jspm')
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create()

var paths = {
    // jspm uses System.config.path property as relative path
    jspm: {
        app: './app/',
        lib: './lib/'
    },
    node: {
        src: './src/',
        app: './src/app/',
        lib: './src/lib/',
        dist: './dist/',
        serve: './serve/',
    }
}

gulp.task('css', function () {
    var postcss = require('gulp-postcss')
    return gulp.src('src/**/*.css')
        .pipe(postcss([ require('cssnext'), require('cssgrace') ]))
        .pipe(gulp.dest('build/'))
})

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: paths.node.serve
        }
    })
    // copy or compile html files to serve bundle js on changes
    gulp.watch(paths.node.src + '**/*', ['serve-watch']);
})

gulp.task('html', function() {
    return gulp.src(paths.node.app + 'index.html')
              .pipe(inject(gulp.src('app.js', {cwd: paths.node.serve}), {read:false}))
              .pipe(gulp.dest(paths.node.serve))
})

gulp.task('jspm', function() {
    return jspm.bundleSFX(paths.jspm.lib + 'main', paths.node.serve + 'app.js', { 
         sourceMaps: false
    })
})

// serve-watch acts as a proxy to ensure compilation tasks are finished before reloading the browser
gulp.task('serve-watch', ['jspm','html'], function() {
    browserSync.reload()
})

// TODO
// common bundles
// https://github.com/jspm/jspm-cli/wiki/API-Usage#importname-parentname---promisemodule
// dist automatization