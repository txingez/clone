import gulp from 'gulp'
import sass from 'gulp-sass'
import cssnext from 'gulp-cssnext'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import cleanCSS from 'gulp-clean-css'
import config from '../config'
import rev from 'gulp-rev'

gulp.task('style', () => {
  return gulp.src(config.style.srcFiles)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(config.style.options))
    .pipe(cssnext())
    .pipe(sourcemaps.write('.'))
    .pipe(concat(config.style.output.filename))
    .pipe(gulp.dest(config.app.buildDir))
})


gulp.task('style:release', () => {
  return gulp.src(config.style.srcFiles)
    .pipe(sass(config.style.prod.options))
    .pipe(cssnext())
    .pipe(concat(config.style.output.filename))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(gulp.dest(config.app.releaseDir))
    .pipe(rev.manifest(config.app.releaseDir + '/rev-manifest.json', { base: config.app.releaseDir, merge: true }))
    .pipe(gulp.dest(config.app.releaseDir))
})
