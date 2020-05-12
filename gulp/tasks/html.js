import config from '../config'
import gulp from 'gulp'
import rename from "gulp-rename"
import handlebars from 'gulp-compile-handlebars'
import fs from 'fs'

// create a handlebars helper to look up
// fingerprinted asset by non-fingerprinted name
var handlebarOpts = {
  helpers: {
    assetPath: function (path, context) {
      return [context.data.root[path]].join('/');
    }
  }
}

gulp.task('html', function () {
  gulp.src(config.html.srcFiles)
    .pipe(gulp.dest(config.app.buildDir))
  gulp.src([config.app.srcDir + '/index_dev.html'])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.app.buildDir))
})

gulp.task('html:release', function () {
    // read in our manifest file
    var manifest = JSON.parse(fs.readFileSync(config.app.releaseDir + '/rev-manifest.json', 'utf8'));

    // read in our handlebars template, compile it using
    // our manifest, and output it to a.html
    gulp.src([config.app.srcDir + '/index.hbs'])
      .pipe(handlebars(manifest, handlebarOpts))
      .pipe(rename('index.html'))
      .pipe(gulp.dest(config.app.releaseDir))

    gulp.src(config.html.srcFiles)
      .pipe(gulp.dest(config.app.releaseDir))
  }
)
