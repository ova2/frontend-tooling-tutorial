// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    }), new HtmlWebpackPlugin({
        excludeChunks: ['manifest'],
        filename: 'index.html',
        template: '../index.html',
        minify: {
            collapseWhitespace: true,
            removeComments: true
        },
        chunksSortMode: function compare(a, b) {
            // vendor always first
            if (a.names[0] === 'vendor') {
                return -1;
            }
            // app always last
            if (a.names[0] === 'app') {
                return 1;
            }
            return 0;
        }
    })]
}));