'use strict';
const path = require('path')
const webpack = require('webpack')
const express = require('express')
const app = express()

module.exports = function (options) {
	return new Promise((resolve, reject) => {
		const port = options.port || 3001
		const compiler = webpack(options.config)

		app.use(require('webpack-dev-middleware')(compiler, Object.assign({}, {
			publicPath: '/',
			stats: {
				colors: true,
				chunks: false
			}
		}, options.compiler || {})))

		app.use(require('webpack-hot-middleware')(compiler))

		if (!options.customIndex) {
			app.get('*', (req, res) => {
				res.sendFile(path.join(__dirname, 'index.html'))
			})
		}

		app.listen(port, 'localhost', err => {
			if (err) {
				return reject(err)
			}
			return resolve(port)
		})
	})
}
