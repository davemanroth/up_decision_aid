var gulp = require('gulp'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver');
    
var src = './process',
    app = './builds/app';

gulp.task('js', function() {
  return browserify({ entries: src + '/js/up_app.js', debug: true })
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe( source( 'up_app.js' ))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest(app + '/js/'));
});

gulp.task('html', function() {
  gulp.src( app + '/**/*.html');
});

gulp.task('css', function() {
  gulp.src( app + '/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch( src + '/js/**/*.js', ['js']);
  gulp.watch( app + '/css/**/*.css', ['css']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src( app + '/')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
