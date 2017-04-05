var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var CacheBuster = require('gulp-cachebust');
var print = require('gulp-print');
var babel = require('gulp-babel');

const cachebust = new CacheBuster();

const paths = {
  app_JS: ['public/js/**/*.js'],
  app_CSS: ['public/styles**/*.*css'],
  app_HTML: ['public/**/*.html'],
  images: ['public/img/**/*.*']
};

gulp.task('build-css', () => {
    gulp.src(paths.app_CSS)
      .pipe(sourcemaps.init())          
      .pipe(sass())                   
      .pipe(cachebust.resources())      
      .pipe(concat('styles.css'))       
      .pipe(sourcemaps.write('./maps')) 
      .pipe(gulp.dest('./dist'))
});

gulp.task('build-js', () => {
   gulp.src(paths.app_JS)               
      .pipe(sourcemaps.init())
      .pipe(print())                        
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))     
      .pipe(sourcemaps.write('./maps')) 
      .pipe(gulp.dest('./dist')); 
});

gulp.task('build-html', () => {
  gulp.src(paths.app_HTML)
    .pipe(cachebust.references())
    .pipe(gulp.dest('./dist'));
})

gulp.task('copy-images', () => {
  gulp.src(paths.images)
  .pipe(gulp.dest('./dist/img'));
})

gulp.task('watch', () => {
  gulp.watch(paths.app_CSS, ['build-css']);
  gulp.watch(paths.app_JS, ['build-js']);
  gulp.watch(paths.app_HTML, ['build-html']);
  gulp.watch(paths.images, ['copy-images']);
})

// gulp.task('build', [ 'build-css', 'build-js'], function() {
//     return gulp.src('./public/index.html')
//         .pipe(cachebust.references())
//         .pipe(gulp.dest('./public/dist'));
// });

// gulp.task('watch', function() {
//     return gulp.watch(['./public/index.html','./public/views/*.html', './public/styles/*.*css', './public/js/**/*.js'], ['build']);
// });

gulp.task('default', [
  'build-css',
  'build-js',
  'build-html',
  'copy-images',
  'watch'
]);