# webpack-hot-server

> A short-hand to establish a web server for hot reloading.

## Install

```
$ npm install --save-dev webpack-hot-middleware webpack-hot-server
```

## Usage

First, setup [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) in your webpack config, i.e. add to entry, push the plugin.

**devServer.js**

You are recommended to use [`html-webpack-plugin`](https://github.com/ampedandwired/html-webpack-plugin) to generate custom HTML output, or this module will use default `index.html`.

```js
const webpack = require('wenpack')
const webpackHotServer = require('webpack-hot-server')
const webpackConfig = require('./webpack.config')

const app = webpackHotServer({
  webpack,
  config: webpackConfig,
  hot: true, // use HMR
  customIndex: true // set when your are using `html-webpack-plugin`,
  // customIndex: '/directory/to/index.html',
  // filename: 'awkward.html',
  wrap(app) {
    app.use() // ... apply your logic or middleware
  },
  compiler: {} // webpack-dev-middleware compiler options
})

app.listen(port, () => {
	console.log(`Webpack Hot Server is running at http://lcoalhost:${port}`)
})
```

**Using with React**

To enable hot reloading for React components, install [`babel-preset-react-hmre`](https://github.com/gaearon/babel-plugin-react-transform) and put the following code in your `.babelrc` file:

```json
{
	"env": {
	    "development": {
	    	"presets": ["react-hmre"]
	    }
	}
}
```

Then run `NODE_ENV=development node devServer.js`

**Using with Vue**

It has seamless integration with `vue-loader`, no additional setup if you use that.

## License

MIT © [EGOIST](https://github.com/egoist)
