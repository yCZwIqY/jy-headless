import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'src/index.tsx',
	output: [
		{
			dir: 'dist',
			format: 'esm',
			preserveModules: true,
			preserveModulesRoot: 'src',
		},
		{
			dir: 'dist/cjs',
			format: 'cjs',
			preserveModules: true,
			preserveModulesRoot: 'src',
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.json',
		}),
		
	],
	external: ['react', 'react-dom'],
};
