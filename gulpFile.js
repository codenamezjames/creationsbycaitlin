const gulp = require('gulp')
const jade = require('gulp-jade')
var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve', ['templates'], function() {

    browserSync.init({
        server: "./",
        open:false
    });
    
    gulp.watch('./src/*.jade', ['templates']);
    gulp.watch('./config/*.js', ['templates']);

    gulp.watch("./index.html").on('change', browserSync.reload);
});


 
gulp.task('templates', function() {
  delete require.cache[require.resolve('./config/products')]
  var products = require('./config/products')
  const YOUR_LOCALS = {products:products}
 
  gulp.src('./src/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./'))
})