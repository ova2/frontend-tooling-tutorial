// Load node modules / gulp plugins
var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var del = require('del');
var printSpaceSavings = require('gulp-print-spacesavings');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var buffer = require('vinyl-buffer');
var browsersync = require('browser-sync');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var beeper = require('beeper');

var config = {
    path: {
        scss: 'app/css/*.scss',
        js: 'app/js/*.ts',
        img: 'app/img/*',
        html: './index.html'
    },
    prod: !!util.env.production
};

// Error Helper
function onError(err) {
    beeper();
    console.log(err);
}

gulp.task('clean', function () {
    return del(['dist/*']);
});

// Process SASS files
gulp.task('sass', function () {
    return gulp.src(config.path.scss, {since: gulp.lastRun('sass')})
    .pipe(plumber({errorHandler: onError}))
    .pipe(concat('bundle.css'))
    .pipe(sass({
        "includePaths": ["./node_modules/normalize.css"]
    }).on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(config.prod ? printSpaceSavings.init() : util.noop())
    .pipe(config.prod ? cleanCSS() : util.noop())
    .pipe(config.prod ? printSpaceSavings.print() : util.noop())
    .pipe(gulp.dest('dist/'));
});

// Process TypeScripts files
gulp.task('scripts', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['app/js/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(config.prod ? printSpaceSavings.init() : util.noop())
    .pipe(config.prod ? uglify() : util.noop())
    .pipe(config.prod ? printSpaceSavings.print() : util.noop())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

// Process images
gulp.task('images', function () {
    return gulp.src(config.path.img)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Copy HTML
gulp.task('copyHtml', function () {
    return gulp.src(config.path.html)
    .pipe(gulp.dest('dist/'));
});

// Watch files for changes
gulp.task('watch', function () {
    gulp.watch(config.path.scss, gulp.series('sass'));
    gulp.watch(config.path.js, gulp.series('scripts'));
    gulp.watch(config.path.img, gulp.series('images'));
    gulp.watch(config.path.html, gulp.series('copyHtml'));
    gulp.watch('dist/**/*').on('change', browsersync.reload);
});

// Configuration for Dev. Server
gulp.task('browser-sync', function () {
    browsersync.init({
        server: {
            baseDir: './dist/'
        }
    });    
});

// Clean transpiled test files
gulp.task('clean-test', function () {
    return del(['test/**/*.js']);
});

// Task to run tests with mocha runner
var tsProject = ts.createProject('./tsconfig.json');
gulp.task('run-test', function() {
    // find test code first
    return gulp.src('./test/**/*.ts', {base: '.'})
    // transpile
    .pipe(ts(tsProject))
    // flush to disk
    .pipe(gulp.dest('.'))
    // execute tests
    .pipe(mocha({
        reporter: 'spec'
    }));
});

// Test task
gulp.task('test', gulp.series('clean-test', 'run-test'));

// Task for development
gulp.task('serve', gulp.parallel('browser-sync', 'watch'));

// Build task
gulp.task('build', gulp.series('clean', 'sass', 'scripts', 'images', 'copyHtml', 'test'));

// Default task
gulp.task('default', gulp.series('build'));


