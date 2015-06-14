'use strict'

var gulp = require('gulp')
var jspm = require('jspm')
var browserSync = require('browser-sync').create()

var paths = {
    // jspm uses System.config.path property as relative path
    jspm: {
        lib: './lib/',
        app: './app/'
    },
    node: {
        app: './src/app/',
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

gulp.task('serve', ['jspm','html'], function() {
    browserSync.init({
        server: {
            baseDir: paths.node.serve
        }
    })

    // copy or compile html files to serve
    // bundle js on changes
    
})

gulp.task('html', function() {
    return gulp.src(paths.node.app + 'index.html')
              .pipe(gulp.dest(paths.node.serve))
})

gulp.task('jspm', function() {
  return jspm.bundleSFX( paths.jspm.lib + 'main', paths.node.serve + 'app.js', { 
         sourceMaps: false


    })
})


