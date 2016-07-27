var path = require('path');
var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
var HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

var ROOT = path.resolve(__dirname, '..');
var CHUNKS_SORT_ORDER = ['manifest', 'vendor', 'app'];

// Common configuration for development and production
module.exports = {
    entry: {
        app: './js/bootstrap.ts',
        vendor: ['jquery'],
    },
    output: {
        path: path.join(ROOT, 'dist')
        //,publicPath: './dist/'
    },
    context: path.join(ROOT, 'src', 'app'),
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.json']
    },
    module: {
        preLoaders: [{
            // TSlint loader support for *.ts files
            // https://github.com/wbuchwalter/tslint-loader
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [path.join(ROOT, 'node_modules')]
        }],
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader"
            })
        }, {
            test: /\.scss/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader!postcss-loader!sass-loader"
            }),
            exclude: /^\_.*\.scss/
        }, {
            test: /\.(png|jpe?g)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(gif|svg|ttf|eot$)$/i,
            loader: 'file-loader'
        }, {
            test: /\.(woff|woff2)$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
    new ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new CommonsChunkPlugin('vendor'),
    // See https://medium.com/@matt.krick/a-production-ready-realtime-saas-with-webpack-7b11ba2fa5b0#.jablywr34
    new CommonsChunkPlugin({name: 'manifest', minChunks: Infinity}),
    new ExtractTextPlugin({
        filename: "bundle.css",
        allChunks: true
    }), new HashedModuleIdsPlugin(),
        new WebpackMd5Hash(),
        new OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
        filename: 'index.html',
        template: '../index.html',
        chunksSortMode: function (a, b) {
            var idxA = CHUNKS_SORT_ORDER.indexOf(a.names[0]);
            var idxB = CHUNKS_SORT_ORDER.indexOf(b.names[0]);
            return idxA - idxB;
        }
    })]
};
