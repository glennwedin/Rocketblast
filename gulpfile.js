var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');
sass.compiler = require('node-sass');

gulp.task('sass', function() {
    return gulp
        .src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('stylesheets/'));
});

gulp.task('minify-css', function() {
    return gulp
        .src('stylesheets/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('stylesheets/'));
});

gulp.task('jsconcat', function() {
    return browserify(['src/js/App.js'])
        .transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});

gulp.task('server', function() {
    connect.server();
});

gulp.task('watch', function() {
    connect.server();
    //connect.serverClose();
    gulp.watch(['src/js/*/*.js', 'src/js/*.js'], gulp.series('jsconcat'));
    gulp.watch('src/scss/*.scss', gulp.series('sass'));

    //gulp.watch(['src/concat/*.js'], ['js']);
});
