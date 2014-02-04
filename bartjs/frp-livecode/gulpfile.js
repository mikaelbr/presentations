var http = require('http');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var lrserver = lr();
var minifyCSS = require('gulp-minify-css');
var ecstatic = require('ecstatic');
var imagemin = require('gulp-imagemin');
var nodemon = require('nodemon');

var livereloadport = 35729;

gulp.task('scripts', function() {
    console.log('hjfdshjdf')
    return gulp.src('app/src/app.js')
        .pipe(browserify())
        .on('error', gutil.log)
        .pipe(concat('scripts.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/build'))
        .pipe(refresh(lrserver));
});

gulp.task('step1', function() {
    return gulp.src('app/src/_stepwise.js')
        .pipe(browserify())
        .on('error', notify.onError())
        .pipe(concat('_stepwise.js'))
        .on('error', notify.onError())
        .pipe(gulp.dest('dist/build'))
        .on('error', notify.onError())
        .pipe(refresh(lrserver));
});

gulp.task('styles', function() {
    return gulp.src('app/css/style.less')
        .pipe(less())
        .on('error', notify.onError())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/build'))
        .pipe(refresh(lrserver));
});

gulp.task('serve', ['scripts', 'styles', 'html', 'assets'], function() {
  //Set up your livereload server
  nodemon({
    script: 'server.js',
    ignore: ["gulpfile.js", "app/*", "dist/*", "node_modules/*"],
    ext: 'js json'
  });

  nodemon.on('start', function () {
    console.log('App has started');
  }).on('quit', function () {
    console.log('App has quit');
  }).on('restart', function (files) {
    console.log('App restarted due to: ', files);
  });

  lrserver.listen(livereloadport);
});

gulp.task('html', function() {
    return gulp.src("app/*.html")
        .pipe(gulp.dest('dist/'))
        .pipe(refresh(lrserver));
})

gulp.task('assets', function() {
    return gulp.src("app/assets/**")
        .pipe(imagemin({optimizationLevel: 5}))
        .on('error', notify.onError)
        .pipe(gulp.dest('dist/assets/'))
        .pipe(refresh(lrserver));
});


// Requires gulp >=v3.5.0
gulp.task('watch', function () {
    gulp.watch(['app/src/**', '!app/src/fake_**'], ['scripts']);
    gulp.watch('app/css/**', ['styles']);
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/assets/**', ['assets']);
});

gulp.task('build', ['scripts', 'styles', 'html', 'assets']);
gulp.task('default', ['serve', 'watch']);