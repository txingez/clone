import gulp from 'gulp'
import bower from 'gulp-bower'

import config from '../config'

gulp.task('bower', () => {
  bower()
})

gulp.task('bower:release', () => {
  gulp.src(config.bower.srcFiles)
    .pipe(gulp.dest(config.app.releaseDir + config.bower.distDir))
})

