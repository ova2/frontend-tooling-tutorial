// Load node modules / gulp plugins
var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var del = require('del');
var printSpaceSavings = require('gulp-print-spacesavings');
var browsersync = require('browser-sync');
var beeper = require('beeper');

var config = {
    path: {
        scss: 'app/css/*.scss', js: 'app/js/*.js', img: 'app/img/*'
    }, prod: !!util.env.production
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

// Process scripts
gulp.task('scripts', function () {
    return gulp.src(config.path.js, {since: gulp.lastRun('scripts')})
    .pipe(plumber({errorHandler: onError}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
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

// Watch files for changes
// gulp.task('watch', function () {
//     gulp.watch(config.path.scss, gulp.series('sass'));
//     gulp.watch(config.path.js, gulp.series('scripts'));
//     gulp.watch(config.path.img, gulp.series('images'));
//     gulp.watch(['index.html', 'dist/**/*'], browsersync.reload);
// });

// gulp.task('browser-sync', function(cb) {
//     return browsersync({
//         server: {
//             baseDir: './'
//         }
//     }, cb);
// });

gulp.task('build', gulp.series('clean', 'sass', 'scripts', 'images'), config.prod ? gulp.parallel('browser-sync', 'watch') : util.noop());

// Default task
//gulp.task('default', gulp.series('clean', 'sass', 'scripts', gulp.parallel('images', 'browser-sync', 'watch')));


