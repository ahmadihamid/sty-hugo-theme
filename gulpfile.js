var gulp       = require('gulp');
var cleanCSS   = require('gulp-clean-css');
var concat     = require('gulp-concat');
var del        = require('del');
var exec       = require('child_process').exec;
var rename     = require('gulp-rename');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var argv       = require('yargs').argv;
var uglify     = require('gulp-uglify');

gulp.task('copy:resetcss', function (){
    return gulp.src(['node_modules/normalize.css/normalize.css'])
        .pipe(cleanCSS())
        .pipe(rename({ extname  : ".min.css"}))
        .pipe(gulp.dest('static/css'));
});

gulp.task('copy:fa', function (){
    return gulp.src(['node_modules/font-awesome/fonts/**/*'])
        .pipe(gulp.dest('static/fonts/FontAwesome'));
});

gulp.task('sass', function(){
    var src = gulp.src(['sass/*.scss']);

    if (argv.sourcemaps) {
        src = src.pipe(sourcemaps.init());
    }

    src = src.pipe(sass().on('error', sass.logError)); // gulp-sass

    if (argv.sourcemaps) {
        src = src.pipe(sourcemaps.write('./'));
    }

    return src.pipe(gulp.dest('static/css'));
});

gulp.task('build:css', ['copy:resetcss', 'sass'] , function (cb) {
    var src = gulp.src([
        'static/css/normalize.min.css',
        'static/css/style.css'
    ]);

    if (argv.sourcemaps) {
        src = src.pipe(sourcemaps.init());
    }

    src = src.pipe(concat('style.min.css')).pipe(cleanCSS());

    if (argv.sourcemaps) {
        src = src.pipe(sourcemaps.write('./'));
    }

    return src.pipe(gulp.dest('static/css'));
});

gulp.task('build:js', function () {
    function createErrorHandler(name) {
        return function (err) {
            console.error('Error from ' + name + ' in build task', err.toString());
        };
    }

    var src = gulp.src([
        'static/js/_*.js'
    ]);

    src = src.pipe(uglify()).on('error', createErrorHandler('uglify'));
    src = src.pipe(concat('main.js'))

    return src.pipe(gulp.dest('static/js'));
});

gulp.task('clean:css', function () {
    return del(['static/css/*']);
});

gulp.task('clean:fa', function () {
    return del(['static/fonts/FontAwesome']);
});

gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['build:css']);
});
