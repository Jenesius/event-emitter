import pkg from './package.json'
import typescript from '@rollup/plugin-typescript';

const NAME = pkg.name;
const VERSION = pkg.version;

const banner = `/*!
  * ${NAME} v${VERSION}
  * (c) ${new Date().getFullYear()} Jenesius
  * @license MIT
  */`

const outputConfig = {
	cjs: {
		file: './dist/index.cjs.js',
		format: `cjs`,
	},
	es: {
		file: './dist/index.esm.js',
		format: 'es'
	}
	
}

function createConfig(format, output) {

	output.banner = banner


	const isGlobalBuild = format === 'global'
	
	if (isGlobalBuild) output.name = NAME

	return {
		input: "./plugin/event-emitter.ts",
		plugins: [
			typescript({ tsconfig: './tsconfig.json' }),
		],
		output,

	}
}

const packageConfigs = Object.keys(outputConfig).map(format =>
	createConfig(format, outputConfig[format])
)


export default [...packageConfigs];

