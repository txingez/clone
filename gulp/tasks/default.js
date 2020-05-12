import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('default', cb => {
  runSequence(
    'clean',
    ['script', 'image'],
    'style',
    'html',
    cb
  )
})
