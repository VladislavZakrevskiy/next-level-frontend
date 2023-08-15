import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import { BuildOptions } from './types/config'
import ReactRefreshWebpackPlugin from 'react-refresh-webpack-plugin'

export const buildPlugins = ({
	paths: { html },
	isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
	const plugins = [
		new HTMLWebpackPlugin({
			template: html,
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
		}),
	]

	if (isDev) {
		plugins.push(new webpack.HotModuleReplacementPlugin())
		plugins.push(new ReactRefreshWebpackPlugin())
	}

	return plugins
}
