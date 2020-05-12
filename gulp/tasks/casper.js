import config from '../config'
import gulp from 'gulp'
import runSequence from 'run-sequence'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()

gulp.task('casper', cb =>
  runSequence(
    ['server:fortest', 'proxy', 'integration'],
    'server:dummy',
    'casper:run',
    ['server:close', 'proxy:close'],
    cb
  ))

gulp.task('casper:run', () =>
  gulp.src(config.integrationTest.build + config.integrationTest.output.filename)
    .pipe($.casperjs({command: ['test', '--engine=slimerjs', '--log-level=debug']})))

gulp.task('integration', () =>
  gulp.src(config.integrationTest.src)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe($.concat(config.integrationTest.output.filename))
    .pipe(gulp.dest(config.integrationTest.build)))
