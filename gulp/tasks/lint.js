import gulp from 'gulp'
import eslint from 'gulp-eslint'
import config from '../config'

gulp.task('lint', () => {
  gulp.src(config.script.srcFiles)
    .pipe(eslint())
    .pipe(eslint.format())
})


gulp.task('lint:gulp', () => {
  gulp.src('./gulp/**')
    .pipe(eslint())
    .pipe(eslint.format())
})
