var gulp = require('gulp');
var util = require('gulp-util');
var imagemin = require('gulp-imagemin');
var ts = require('gulp-typescript');
var del = require('del');
var webpack = require("webpack");

var webpackDev = require("./config/webpack.dev");
var webpackProd = require("./config/webpack.prod");

var config = {
    path: {
        jsall: 'src/app/js/**/*.ts',
        img: 'src/app/img/**/*'
    }
    //,prod: !!util.env.production
};

// Delete distribution folder
gulp.task('clean', function () {
    return del(['dist/*']);
});

// Process images
gulp.task('images', function () {
    return gulp.src(config.path.img)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Clean transpiled test files
gulp.task('clean-test', function () {
    return del(['test/*']);
});

var tsProject = ts.createProject('./tsconfig.json');
// Task to prepare tests for mocha runner
gulp.task('scripts-test', function() {
    // find all TypeScript files first
    return gulp.src(config.path.jsall, {base: './src/app/'})
    // transpile
    .pipe(ts(tsProject))
    // flush to disk
    .pipe(gulp.dest('test/'));
});

// Test task
gulp.task('prepare-test', gulp.series('clean-test', 'scripts-test'));

// Process files via Webpack config. for development
gulp.task('webpack:dev', function(done) {
    // run webpack
    webpack(webpackDev, function (err, stats) {
        if (err) {
            throw new util.PluginError("webpack", err);
        }
        util.log("[webpack]", stats.toString({
            colors: true,
            chunks: false
        }));
        done();
    });
});

// Process files via Webpack config. for production
gulp.task('webpack:prod', function(done) {
    // run webpack
    webpack(webpackProd, function (err, stats) {
        if (err) {
            throw new util.PluginError("webpack", err);
        }
        util.log("[webpack]", stats.toString({
            colors: true,
            chunks: false
        }));
        done();
    });
});

// Build task for development
gulp.task('build:dev', gulp.series('clean', 'images', 'webpack:dev'));

// Build task for production
gulp.task('build:prod', gulp.series('clean', 'images', 'webpack:prod'));

// Test task
gulp.task('prepare-test', gulp.series('clean-test', 'scripts-test'));

// Default task
gulp.task('default', gulp.series('build:dev'));

