'use strict';
const Path = require('path')
const webpack = require('webpack')
const express = require('express')
const app = express()
const self = this

module.exports = function (options) {
  const config = options.config || {}
  if (typeof options.webpack !== 'function') {
    throw new TypeError('Expected to pass the webpack module')
  }
  const compiler = webpack(config)

  const devMiddleWare = require('webpack-dev-middleware')(compiler, Object.assign({}, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }
  }, options.compiler || {}))

  const dist = config.output.path
  devMiddleWare.fileSystem.mkdirpSync(dist)

  app.use(devMiddleWare)

  if (options.hot) {
    app.use(require('webpack-hot-middleware')(compiler))
  }

  if (typeof options.wrap === 'function') {
    options.wrap(app)
  }

  app.get('*', (req, res) => {
    const fs = devMiddleWare.fileSystem
    devMiddleWare.waitUntilValid(() => {
      if (options.customIndex) {
        const fp = typeof options.customIndex === 'string'
          ? options.customIndex
          : config.output.path
        const filename = options.filename || 'index.html'
        const filepath = Path.join(fp, filename)
        const contents = fs.readdirSync(dist)
        const exists = contents.indexOf(filename) !== -1
        if (exists) {
          res.end(fs.readFileSync(filepath))
        } else {
          res.end('Refresh when bundle is valid...')
        }
      } else {
        res.sendFile(Path.join(__dirname, 'index.html'))
      }
    })
  })

  return app
}

module.exports.express = express
