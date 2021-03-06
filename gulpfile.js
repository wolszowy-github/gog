var gulp = require('gulp');
var webserver = require('gulp-webserver');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('webserver', function() {
  gulp.src("./")
    .pipe(webserver({
        livereload: true,
        fallback: "index.html",
        port: 8080,
        open: true
    }));;
});

// gulp.task('default', ['sass', 'webserver'], function() {
//   gulp.watch(['scss/**/*.scss'], ['sass']);
// });

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
