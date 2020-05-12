import config from '../config'
import gulp from 'gulp'

gulp.task('watch', () => {
  let watcherHtml = gulp.watch(config.html.srcFiles, ['html', 'server:reload'])
  watcherHtml.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  })

  let watcherImage = gulp.watch(config.html.srcFiles, ['image', 'server:reload'])
  watcherImage.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  })

  let watcherStyle = gulp.watch(config.style.srcFiles, ['style', 'server:reload'])
  watcherStyle.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  })

  let watcherScript = gulp.watch(config.script.srcFiles, ['script', 'server:reload'])
  watcherScript.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  })
})
