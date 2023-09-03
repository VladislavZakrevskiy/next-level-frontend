import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(
    options: BuildOptions
): webpack.RuleSetRule[] {
    const svgLoader = buildSvgLoader()

    const tsxCodeBabelLoader = buildBabelLoader({
        ...options,
        isTsx: true,
    })
    const codeBabelLoader = buildBabelLoader({
        ...options,
        isTsx: false,
    })

    const cssLoader = buildCssLoader(options.isDev)

    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // }

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
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader,
    ]
}
