import config from '../../src/dummyData/mocky'

import gulp from 'gulp'
import mocky from 'mocky'

gulp.task('mocky', () => {
  mocky.createServer(config).listen(4321)
})

