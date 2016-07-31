// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = validate(webpackMerge(commonConfig, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    tslint: {
        emitErrors: false,
        failOnHint: false
    },
    plugins: [
        new SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: ['bundle.css', 'manifest.js', 'vendor.js']
        }),
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
