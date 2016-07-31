var gulp = require('gulp');
var util = require('gulp-util');
var ts = require('gulp-typescript');
var webpack = require("webpack");

var webpackDev = require("./config/webpack.dev");
var webpackProd = require("./config/webpack.prod");

// var prod = !!util.env.production;

var runWebpack = function (config, done) {
    // run webpack
    webpack(config, function (err, stats) {
        if (err) {
            throw new util.PluginError("webpack", err);
        }
        util.log("[webpack]", stats.toString({
            colors: true,
            chunks: false
        }));
        done();
    });
};

var tsProject = ts.createProject('./tsconfig.json');
// Task to prepare tests for mocha runner
gulp.task('scripts:test', function () {
    // find all TypeScript files first
    return gulp.src('src/app/js/**/*.ts', {base: './src/app/'})
    // transpile
    .pipe(ts(tsProject))
    // flush to disk
    .pipe(gulp.dest('test/'));
});

// Process files via Webpack config. for development
gulp.task('webpack:dev', function (done) {
    runWebpack(webpackDev, done);
});

// Process files via Webpack config. for production
gulp.task('webpack:prod', function (done) {
    runWebpack(webpackProd, done);
});

// Default task
gulp.task('default', gulp.series('webpack:dev'));

