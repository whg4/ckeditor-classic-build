// webpack.config.js

'use strict';

const path = require('path');
const { styles, loaders } = require('@ckeditor/ckeditor5-dev-utils');
const webpack = require('webpack');

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

	module: {
		rules: [
			{
				test: /\.svg$/,

				use: ['raw-loader']
			},
			{
				test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

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
		new webpack.NormalModuleReplacementPlugin(
			/bold\.svg/,
			path.join(__dirname, './icons/rtf_b.svg')
		),
		new webpack.NormalModuleReplacementPlugin(
			/image\.svg/,
			path.join(__dirname, './icons/rtf_image.svg')
		),
		new webpack.NormalModuleReplacementPlugin(
			/font-size\.svg/,
			path.join(__dirname, './icons/rtf_t.svg')
		),
		new webpack.NormalModuleReplacementPlugin(
			/paragraph\.svg/,
			path.join(__dirname, './icons/rtf_h.svg')
		),
	],

	// Useful for debugging.
	devtool: 'source-map',

	// By default webpack logs warnings if the bundle is bigger than 200kb.
	performance: { hints: false }
};
