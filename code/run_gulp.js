var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");

var depend_scripts = [
  'app/public/share/js/jquery.js',
  'app/public/share/js/bootstrap.js'
];


var paths = {
  depend_scripts: depend_scripts
  //depend_scripts: ['app/public/js/custom/*.js'],
};


gulp.task('depend_scripts', function() {
  return gulp.src(paths.depend_scripts)
    .pipe(uglify())
    .pipe(concat('dependencies.min.js'))
    .pipe(gulp.dest('app/public/frontend/js'))
    .pipe(notify({ message: 'Scripts dependencies completed' }));
});

/*gulp.task('custom_scripts', function() {
  return gulp.src(paths.custom_scripts)
    .pipe(uglify({mangle: false}))
    .pipe(concat('custom.min.js'))
    .pipe(gulp.dest('./../app/static/js'))
    .pipe(notify({ message: 'Scripts custom completed' }));
});
*/

gulp.watch(paths.depend_scripts, ['depend_scripts']);

gulp.start('depend_scripts');