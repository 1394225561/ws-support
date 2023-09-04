import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const isProduction = process.env.NODE_ENV === 'production';

export default (async () => ({
  input: 'main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    strict: false
  },
	plugins: [
    resolve(),
		commonjs(),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: false,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            corejs: 3,
            helpers: true,
            regenerator: true,
            version: '7.0.0-beta.0',
          },
        ],
      ],
    }),
		isProduction && (await import('@rollup/plugin-terser')).default(),
  ]
}))();