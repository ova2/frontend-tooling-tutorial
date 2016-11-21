// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = validate(webpackMerge(commonConfig, {
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    bail: true,
    tslint: {
        emitErrors: true,
        failOnHint: true
    },
    plugins: [
        new DedupePlugin(),
        new UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: true
            },
            output: {
                comments: false
            }
        })
    ]
}));