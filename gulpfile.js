var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browserifyshim = require('browserify-shim'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver');
    
var src = './process',
    app = './builds/app';

gulp.task('js', function() {
  return browserify({ debug: true })
    .transform(babelify, { presets: ['es2015', 'react'] })
    .transform(browserifyshim)
    .bundle()
    .pipe(gulp.src( src + '/js/up_app.js' ))
    uglify()
    .pipe(gulp.dest(app + '/js'));
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
