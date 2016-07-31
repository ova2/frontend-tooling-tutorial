// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var CopyWebpackPlugin = require('copy-webpack-plugin');

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
        new CopyWebpackPlugin([
            // TODO
        ])
    ]
}));