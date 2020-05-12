import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('test', cb => runSequence('default', 'karma', 'casper', cb))
