import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('release', cb => {
  runSequence(
    'clean:release',
    ['bower:release', 'image:release', 'script:release'],
    'style:release',
    'html:release',
    cb
  )
})
