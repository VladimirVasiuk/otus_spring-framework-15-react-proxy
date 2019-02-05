const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },

    devServer: {
    port: '8081',
    proxy: {
      '/api':{
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
    },
    after(app) {
      app.get('*', (req, res) => {
        // supports routes
        req.url = '/index.html';
        // noinspection JSAccessibilityCheck
        app.handle(req, res);
      });
    }
  },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
    ]
}
