var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', function() {

});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });

  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: '.'}, reload);
});
