# webpack-hot-server

> A short-hand to establish a web server for hot reloading.

## Install

```
$ npm install --save-dev webpack-hot-server
```

## Usage

**devServer.js**

```js
const webpackHotServer = require('webpack-hot-server')
const webpackConfig = require('./webpack.config')

webpackHotServer({
	port: 3000,
	config: webpackConfig
})
.then(port => {
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
