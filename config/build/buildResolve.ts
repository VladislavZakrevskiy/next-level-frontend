import webpack from 'webpack';

export const buildResolve = (): webpack.ResolveOptions => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}