var gulp = require('gulp'),
  del = require('del');
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jslint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  browserSync = require('browser-sync'),

  paths = {
    scripts: ['src/scripts/*.js', 'src/scripts/**/*.js'],
    stylesheets: ['src/stylesheets/*.scss', 'src/stylesheets/**/*.scss'],
    images: ['src/assets/images/**/*.{gif,jpg,png,svg}', 'src/assets/images/*.{gif,jpg,png,svg}'],
    copy: ['src/*.html', 'lib/*']
  };
// Styles
gulp.task('styles', function() {
  return gulp.src(paths.stylesheets)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(notify({
      message: 'Styles task complete'
    }));
});
//copy
gulp.task('copy', function() {
  gulp.src(paths.copy[0]).pipe(gulp.dest('dist/'));
  return gulp.src(paths.copy[1]).pipe(gulp.dest('dist/lib'));
});
// Scripts
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});
// Images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({
      message: 'Images task complete'
    }));
});
// Clean
gulp.task('clean', function(cb) {
  del(['dist/*'], cb)
});

gulp.task('sass', function() {
  return gulp.src(paths.stylesheets)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/stylesheets'))
    .pipe(browserSync.stream())
    .pipe(notify({
      message: 'sass task complete'
    }));;
});


gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(paths.stylesheets, ['sass']);
  // Watch .js files
  gulp.watch(paths.scripts, browserSync.reload);
  // Watch image files
  gulp.watch(paths.images, browserSync.reload);
  gulp.watch(["src/*.html", "src/**/*.html"]).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve'], function() {

});

gulp.task('build', ['clean', 'copy', 'styles', 'scripts', 'images']);

//todo
//没有做文件的合并,必要时候可以增加
//插件：cancat .pipe(concat('main.js'))
