// webpack.config.js

'use strict';

const path = require('path');
const { styles, loaders } = require('@ckeditor/ckeditor5-dev-utils');

const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('webpack');

const { CKEditorTranslationsPlugin } = require('@ckeditor/ckeditor5-dev-translations');


module.exports = {
	devtool: 'source-map',

	// https://webpack.js.org/configuration/entry-context/
	entry: path.join(__dirname, './src/ckeditor.ts'),

	// https://webpack.js.org/configuration/output/
	output: {
		library: 'ClassicEditor',

		path: path.resolve(__dirname, 'build'),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	resolve: {
		extensions: ['.ts', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.svg$/,

				use: ['raw-loader']
			},
			{
				test: /\.css$/,

				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: styles.getPostCssConfig({
								themeImporter: {
									themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
								},
								minify: true
							})
						}
					},
				]
			},
			loaders.getTypeScriptLoader()
		]
	},

	plugins: [
		new CKEditorTranslationsPlugin({
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en',
			additionalLanguages: ['zh-cn', 'vi']
		}),
		new webpack.NormalModuleReplacementPlugin(
			/bold\.svg/,
			path.join(__dirname, './src/themes/icons/rtf_b.svg')
		),
		new webpack.NormalModuleReplacementPlugin(
			/image\.svg/,
			path.join(__dirname, './src/themes/icons/rtf_image.svg')
		),
		new webpack.NormalModuleReplacementPlugin(
			/font-size\.svg/,
			path.join(__dirname, './src/themes/icons/rtf_t.svg')
		),
		// dropdown-arrow.svg
		new webpack.NormalModuleReplacementPlugin(
			/dropdown-arrow\.svg/,
			path.join(__dirname, './src/themes/icons/caret_under.svg')
		),
	],

	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false
			})
		]
	},

	// Useful for debugging.
	devtool: 'source-map',

	// By default webpack logs warnings if the bundle is bigger than 200kb.
	performance: { hints: false }
};
