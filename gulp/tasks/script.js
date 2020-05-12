import config from '../config'
import gulp from 'gulp'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import sourcemaps from 'gulp-sourcemaps'
import eslint from 'gulp-eslint'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import rev from 'gulp-rev'

gulp.task('script', () => {
  return gulp.src(config.script.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js'
      },
      devtool: '#source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('development')
          }
        })
      ],
      entry: ['babel-polyfill','./src/main/index.js'],
      module: {
        loaders: [
          {
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/
          }
        ]
      }
    }))
    .pipe(gulp.dest(config.app.buildDir))
})

gulp.task('script:release', () => {
  return gulp.src(config.script.srcFiles)
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js'
      },
      // devtool: 'source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new MinifyPlugin()
      ],
      entry: ['babel-polyfill','./src/main/index.js'],
      module: {
        loaders: [
          {
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/
          }
        ]
      }
    }))
    .pipe(rev())
    .pipe(gulp.dest(config.app.releaseDir))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.app.releaseDir))
})
