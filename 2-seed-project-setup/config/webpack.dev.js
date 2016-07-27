// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = validate(webpackMerge(commonConfig, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    devtool: 'source-map',
    tslint: {
        emitErrors: false,
        failOnHint: false
    },
    plugins: [
        new OpenBrowserPlugin({url: 'http://localhost:3000'})
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        contentBase: 'dist/',
        watchOptions: {
            aggregateTimeout: 100,
            poll: 300
        },
        stats: {
            colors: true
        }
    }
}));
