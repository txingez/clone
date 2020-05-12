import config from '../config'
import gulp from 'gulp'
import file from 'gulp-file'
import runSequence from 'run-sequence'
import page from '../template/page'
import createPage from '../template/createPage'
import editPage from '../template/editPage'
import detailPage from '../template/detailPage'
import detail from '../template/detail'
import form from '../template/form'
import action from '../template/action'
import reducer from '../template/reducer'
import reducers from '../template/reducers'
import constant from '../template/constant'
import ajax from '../template/ajax'
import _ from 'lodash'

const arg = (argList => {
  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');
    if (opt === thisOpt) {
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    }
    else {
      curOpt = opt;
      arg[curOpt] = true;
    }
  }
  return arg;

})(process.argv)

gulp.task('make:ui', cb => {
  runSequence(
    'make:constant',
    'make:ajax',
    'make:page',
    'make:createPage',
    'make:editPage',
    'make:detailPage',
    'make:detail',
    'make:form',
    'make:action',
    'make:reducer',
    'make:reducers',
    cb
  )
  })

gulp.task('make:page', () => {
  return file(_.camelCase(arg.name) + '/' + _.camelCase(arg.name) + 'Page.js', page(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})

gulp.task('make:createPage', () => {
  return file(_.camelCase(arg.name) + '/' + _.camelCase(arg.name) + 'CreatePage.js', createPage(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})

gulp.task('make:editPage', () => {
  return file(_.camelCase(arg.name) + '/' + _.camelCase(arg.name) + 'EditPage.js', editPage(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})

gulp.task('make:detailPage', () => {
  return file(_.camelCase(arg.name) + '/' + _.camelCase(arg.name) + 'DetailPage.js', detailPage(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})

gulp.task('make:detail', () => {
  return file(_.camelCase(arg.name) + '/detail/' + _.camelCase(arg.name) + 'Detail.js', detail(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})

gulp.task('make:form', () => {
  return file(_.camelCase(arg.name) + '/form/' + _.camelCase(arg.name) + 'Form.js', form(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})

gulp.task('make:action', () => {
  return file(_.camelCase(arg.name) + '/' + _.camelCase(arg.name) + 'Action.js', action(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})

gulp.task('make:constant', () => {
  return file(_.camelCase(arg.name) + '.js', constant(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/constants'))
})

gulp.task('make:ajax', () => {
  return file(_.camelCase(arg.name) + '.js', ajax(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ajax'))
})

gulp.task('make:reducer', () => {
  return file(_.camelCase(arg.name) + '/' + _.camelCase(arg.name) + 'Reducer.js', reducer(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})

gulp.task('make:reducers', () => {
  return file(_.camelCase(arg.name) + '/' + _.camelCase(arg.name) + 'sReducer.js', reducers(_.camelCase(arg.name)), { src: true })
    .pipe(gulp.dest(config.app.srcDir + '/app/ui'))
})
