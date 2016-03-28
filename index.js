'use strict';
const path = require('path')
const webpack = require('webpack')
const express = require('express')
const app = express()
const self = this

module.exports = function (options) {
	return new Promise((resolve, reject) => {
		const port = options.port || 3001
		const config = options.config || {}
		config.output.publicPath = '/'
		const compiler = webpack(config)

		const devMiddleWare = require('webpack-dev-middleware')(compiler, Object.assign({}, {
			publicPath: config.output.publicPath,
			stats: {
				colors: true,
				chunks: false
			}
		}, options.compiler || {}))

		app.use(self.middleware = devMiddleWare)

		app.use(require('webpack-hot-middleware')(compiler))

		app.get('*', (req, res) => {
			if (options.customIndex) {
				var index = self.middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html'))
			  res.end(index)
			} else {
				res.sendFile(path.join(__dirname, 'index.html'))
			}
		})

		app.listen(port, 'localhost', err => {
			if (err) {
				return reject(err)
			}
			return resolve(port)
		})
	})
}
