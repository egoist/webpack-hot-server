const webpack = require('webpack')
const hotServer = require('../')

hotServer({
	webpack,
	port: 3001,
	config: {
		entry: __dirname + '/src.js',
		output: {
			path: __dirname,
			filename: 'bundle.js'
		}
	}
})

setTimeout(() => process.exit(), 1000)
