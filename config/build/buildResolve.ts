import webpack from 'webpack';
import { BuildOptions } from './types/config';

export const buildResolve = ({paths: {src}}: BuildOptions): webpack.ResolveOptions => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [src, 'node_modules'],
        alias: {},
        mainFiles: ['index']
    }
}