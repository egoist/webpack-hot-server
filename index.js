'use strict';
const Path = require('path')
const webpack = require('webpack')
const express = require('express')
const app = express()
const self = this

module.exports = function (options) {
  return new Promise((resolve, reject) => {
    const port = options.port || 3001
    const config = options.config || {}
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

    app.use(self.middleware = devMiddleWare)

    app.use(require('webpack-hot-middleware')(compiler))

    app.get('*', (req, res) => {
      const fs = self.middleware.fileSystem
      self.middleware.waitUntilValid(() => {
        if (options.customIndex) {
          const fp = typeof options.customIndex === 'string'
            ? options.customIndex
            : config.output.path
          const filename = Path.join(fp, options.filename || 'index.html')
          const exists = fs.statSync(filename).isFile()
          if (exists) {
            res.end(fs.readFileSync(filename))
          } else {
            res.end('Refresh when bundle valid...')
          }
        } else {
          res.sendFile(Path.join(__dirname, 'index.html'))
        }
      })
    })

    app.listen(port, 'localhost', err => {
      if (err) {
        return reject(err)
      }
      return resolve(port)
    })
  })
}
