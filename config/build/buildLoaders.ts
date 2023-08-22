import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders({
    isDev,
}: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = buildSvgLoader()

    const babelLoader = buildBabelLoader(isDev)

    const cssLoader = buildCssLoader(isDev)

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
    ]
}
