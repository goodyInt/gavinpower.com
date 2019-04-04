 var gulp = require('gulp');
 var sass = require('gulp-sass');
 var imagemin = require('gulp-imagemin');
 var uglify = require('gulp-uglify');
 var cssnano = require('gulp-cssnano');
 var postcss = require('gulp-postcss');
 var rename = require("gulp-rename");
 var browserify = require('browserify');
 var source = require('vinyl-source-stream')
 var browserSync = require('browser-sync').create();
 var autoprefixer = require('autoprefixer');

// preprocess scss
 gulp.task("preProCss", function () {
   return gulp.src('app/src/sass/hireStyle.scss')
   .pipe(sass({style: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('app/dist/css'))
 });

// minCss 
 gulp.task('uglifyCss', function() {
  return gulp.src('app/dist/css/hireStyle.css')
      .pipe(cssnano())
      .pipe(gulp.dest('app/dist/css'));
});

//postProCss
gulp.task('postProCss', function () {
  var plugins = [
      autoprefixer({browsers: ['last 1 version']}),
  ];
  return gulp.src('app/dist/css/hireStyle.css')
      .pipe(postcss(plugins))
      .pipe(gulp.dest('app/dist/css'));
});


// copyHtml 
 gulp.task("copyHtml", function () {
  return gulp.src('app/src/*.html')
  .pipe(gulp.dest('app/dist'))
});

// optimizeImages
gulp.task("minImg", function () {
  return gulp.src('app/src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('app/dist/img'))
});

// moveFonts
gulp.task("moveFonts", function () {
  return gulp.src('app/src/fonts/*')
  .pipe(gulp.dest('app/dist/fonts'))
});

// uglifyBundle
gulp.task("uglifyJs", function () {
  return gulp.src('app/dist/js/bundle.js')
  .pipe(uglify())
  .pipe(gulp.dest('app/dist/js/'))
});

// browserify outputed js
gulp.task('preProJs', function(done) {
  var bundleStream = browserify('app/src/js/main.js').bundle()
  bundleStream
    .pipe(source('main.js'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('app/dist/js'))
    done();
  })

// build for development
gulp.task("buildDev", gulp.series('preProCss','copyHtml','postProCss','preProJs'));

// build for production
gulp.task("buildProd", gulp.series('preProJs','preProCss','copyHtml', 'postProCss', 'minImg','moveFonts','uglifyCss','uglifyJs'));

// watch and reload
gulp.task("watch", function () {
  gulp.watch('app/src/js/**/*.js', gulp.series('preProJs','reload'));
  gulp.watch('app/src/sass/*.scss', gulp.series('preProCss','reload'));
  gulp.watch('app/src/*.html', gulp.series('copyHtml', 'reload'));
});

// open a live browser
gulp.task("serve", function () {
   browserSync.init({server:'./app/dist/'})
});

// reload live browser
gulp.task("reload", function (done) {
  browserSync.reload();
  done();
});

// all aboard the big dev train!
gulp.task("gogo", gulp.parallel('serve', 'watch'));

/*
 --TOP LEVEL FUNCTIONS--
 gulp.task - define tasks 
 gulp.src - Point to files to use
 gulp.dest - points to folder to output
 gulp.watch - watch files and folders for changes
 */