var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");

var depend_scripts = [
  'app/public/share/js/jquery.js',
  'app/public/share/js/bootstrap.js',
  'app/public/share/js/alertifyjs/alertify.min.js',
  'app/public/share/js/audiojs/audio.js',
  'app/public/share/js/underscore-min.js',
  'app/public/share/js/angular-1.2.25/angular.min.js',
  'app/public/share/js/angular-1.2.25/angular-sanitize.min.js',
  'app/public/share/js/angular-1.2.25/angular-route.min.js',
  'app/public/share/js/angular-1.2.25/angular-resource.min.js',
  'app/public/share/js/angular-1.2.25/angular-cookies.min.js',
  'app/public/share/js/angular-1.2.25/angular-animate.min.js'
];

var custom_scripts = [
  'app/public/frontend/js/app.js',
  'app/public/frontend/js/libraries/factories.js',
  'app/public/frontend/js/libraries/directives.js',
  'app/public/frontend/js/general.js',
  'app/public/frontend/js/users/user.js',
  'app/public/frontend/js/users/theme.js',
  'app/public/frontend/js/users/login.js',
  'app/public/frontend/js/users/logout.js',
  'app/public/frontend/js/users/register.js',
  'app/public/frontend/js/users/setting.js',
  'app/public/frontend/js/users/forgot.js',
  'app/public/frontend/js/album/album.js',
  'app/public/frontend/js/player/player.js',
  'app/public/frontend/js/song/song.js',
  'app/public/frontend/js/navigation/navigation.js',
  'app/public/frontend/js/header/header.js'
];



var paths = {
  depend_scripts: depend_scripts,
  custom_scripts: custom_scripts
};


gulp.task('depend_scripts', function() {
  return gulp.src(paths.depend_scripts)
    .pipe(uglify())
    .pipe(concat('dependencies.min.js'))
    .pipe(gulp.dest('app/public/frontend/js'))
    .pipe(notify({ message: 'Scripts dependencies completed' }));
});

gulp.task('custom_scripts', function() {
  return gulp.src(paths.custom_scripts)
    .pipe(uglify({mangle: false}))
    .pipe(concat('custom.min.js'))
    .pipe(gulp.dest('app/public/frontend/js'))
    .pipe(notify({ message: 'Scripts custom completed' }));
});


//gulp.watch(paths.depend_scripts, ['depend_scripts']);

gulp.start('depend_scripts');
gulp.start('custom_scripts');