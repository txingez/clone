const app = {
  srcDir: './src/main',
  srcFiles: './src/main/**',
  buildDir: './.build',
  releaseDir: './dist'
}

export default {
  app: app,

  html: {
    srcFiles: [
      app.srcFiles + '/*.html'
    ]
  },

  image: {
    srcFiles: [
      app.srcDir + '/images/**/*.gif',
      app.srcDir + '/images/**/*.png',
      app.srcDir + '/images/**/*.ico'
    ],
    distDir: '/images'
  },

  style: {
    srcFiles: app.srcFiles + '/**/*.scss',
    output: {
      filename: 'bundle.css'
    },
    options: {
      outputStyle: 'expanded'
    },
    prod: {
      options: {
        outputStyle: 'compressed'
      }
    }
  },
  script: {
    srcFiles: app.srcFiles + '/*.js'
  },

  proxy: {
    backend: {
      url: '/api',
      config: {
        target: 'http://localhost:9000'
      }
    },
    dummy: {
      url: '/api',
      config: {
        target: 'http://localhost:4321'
      }
    }
  },

  bower: {
    srcFiles: 'bower_components/**/*',
    distDir: '/bower_components'
  }
}
