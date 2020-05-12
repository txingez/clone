import config from '../config'
import gulp from 'gulp'

gulp.task('image', () => {
  gulp.src(config.image.srcFiles)
    .pipe(gulp.dest(config.app.buildDir + config.image.distDir))
})

gulp.task('image:release', () => {
  gulp.src(config.image.srcFiles)
    .pipe(gulp.dest(config.app.releaseDir + config.image.distDir))
})
