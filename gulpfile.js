var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var CacheBuster = require('gulp-cachebust');
var print = require('gulp-print');
var babel = require('gulp-babel');

var cachebust = new CacheBuster();

gulp.task('build-css', function(){
   return gulp.src('./public/styles/*') // Grab every file in the folder "styles"
      .pipe(sourcemaps.init())          // Create map of source for browser
      .pipe(sass())                     // Pipe means take results of last line and feed
      .pipe(cachebust.resources())      // into next line.
      .pipe(concat('styles.css'))       // Put it all into styles.css
      .pipe(sourcemaps.write('./maps')) 
      .pipe(gulp.dest('./public/dist'))
});

gulp.task('build-js', function() {
   return gulp.src('./public/js/**/*.js')               
      .pipe(sourcemaps.init())
      .pipe(print())                        
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))     
      .pipe(sourcemaps.write('./')) 
      .pipe(gulp.dest('./public/dist')); 
});

gulp.task('build', [ 'build-css', 'build-js'], function() {
    return gulp.src('./public/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./public/index.html','./public/views/*.html', './public/styles/*.*css', './public/js/**/*.js'], ['build']);
});

gulp.task('default', ['watch', 'build']);