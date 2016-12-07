'use strict';

const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'babel-polyfill',
		'eventsource-polyfill',
		path.resolve(__dirname, 'public/main.js')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: path.join('assets', 'js', 'bundle.js'),
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['latest']
				}
			},
			{
				test: /\.(s)?css/,
				loader: 'style-loader!css-loader!postcss-loader!sass-loader'
			},
			{
				test: /\.tmpl\.xml/,
				loader: 'fest-loader'
			}
		]
	},
	resolve: {
		alias: {}
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
		alias: {
			'fest-loader': path.resolve(__dirname, './fest-loader')
		}
	},
	plugins: [
		new CleanWebpackPlugin('dist'),
		new webpack.LoaderOptionsPlugin({
			debug: true,
			postcss: [precss, autoprefixer]
		}),
		new webpack.NoErrorsPlugin(),
		new HtmlPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'public/index.html')
		})
	]
};
