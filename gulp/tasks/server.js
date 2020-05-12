import config from '../config'
import gulp from 'gulp'
import runSequence from 'run-sequence'
import browserSync from 'browser-sync'
import proxyMiddleware from 'http-proxy-middleware'
import historyApiFallback from 'connect-history-api-fallback'
let bs = browserSync.create()

gulp.task('server', cb =>
  runSequence(
    ['default', 'watch'],
    ['server:build'],
    cb
  ))

gulp.task('server:frontonly', cb =>
  runSequence(
    ['default', 'watch', 'mocky'],
    ['server:dummy'],
    cb
  ))

gulp.task('server:dist', () => {
  runSequence(
    'release',
    'server:release'
  )
})

gulp.task('server:reload', () => {
  let delay = 200
  setTimeout(bs.reload, delay)
})

let serverConfig = {
  open: false,
  server: {
    baseDir: [config.app.buildDir, config.app.srcDir],
    routes: {
      '/bower_components': 'bower_components'
    }

  },
  ghostMode: {
    location: true
  }
}

gulp.task('server:build', () => {
  serverConfig.middleware = [historyApiFallback(), proxyMiddleware(config.proxy.backend.url, config.proxy.backend.config)]
  bs.init(serverConfig)
})

gulp.task('server:dummy', () => {
  let dummyConfig = serverConfig
  dummyConfig.middleware = [historyApiFallback(), proxyMiddleware(config.proxy.dummy.url, config.proxy.dummy.config)]
  bs.init(dummyConfig)
})

gulp.task('server:release', () => {
  serverConfig.server.baseDir = config.app.releaseDir
  serverConfig.middleware = [historyApiFallback(), proxyMiddleware(config.proxy.backend.url, config.proxy.backend.config)]
  bs.init(serverConfig)
})

