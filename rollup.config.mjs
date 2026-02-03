import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'src/index.ts',
	output: [
		{
			dir: 'dist',
			format: 'esm',
			preserveModules: true,
			preserveModulesRoot: 'src',
			sourcemap: true,
			entryFileNames: '[name].js',
			chunkFileNames: '[name]-[hash].js',
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		typescript({
			tsconfig: './tsconfig.json',
			useTsconfigDeclarationDir: true,
			clean: true,
		}),
		
	],
	external: ['react', 'react-dom', 'react/jsx-runtime'],
};
