var gulp 	= require('gulp'),
	compass = require('gulp-compass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minifyCss = require('gulp-minify-css'),
	connect = require('gulp-connect'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer');

gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss')
	.pipe(compass({
		config_file: 'config.rb',
		css: 'stylesheets',
		sass: 'src/scss/'
	}))
	.pipe(gulp.dest('stylesheets/'));
});

gulp.task('minify-css', function() {
	return gulp.src('stylesheets/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('stylesheets/'));
});
/*
gulp.task('jsconcat', function () {
	gulp.src([
		//'src/js/vendor/jquery-1.11.3.js',
	]).pipe(concat('vendor.js'))
	.pipe(gulp.dest('src/concat/'));

	gulp.src([
		'src/js/app.js',
		'src/js/components/*.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('src/concat/'));
	return gulp;
});
*/
gulp.task('jsconcat', function () {
	return browserify(['src/js/App.js'])
	.transform("babelify", {presets: ["es2015"]})
	.bundle()
	.pipe(source('app.js'))
	.pipe(buffer())
    .pipe(uglify()) 
	.pipe(gulp.dest('./js/'));
});


gulp.task('server', function () {
	connect.server();
});

gulp.task('watch', function() {
	connect.server();
	gulp.watch('src/scss/*.scss', ['sass']);
	gulp.watch(['src/js/*/*.js', 'src/js/*.js'], ['jsconcat']);
	//gulp.watch(['src/concat/*.js'], ['js']);
});