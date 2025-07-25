import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
    input: 'modules/talkinghead.mjs', // entry point
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm'
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' })
    ]
};
