/**
 * Script to build (with ESBuild) node generators scripts for each node from nodes folder.
 */
const path = require('path');
const esbuild = require('esbuild');
const glob = require('tiny-glob/sync');

const sources = glob('nodes/*/descriptions/gen.ts')
sources.forEach(src => {
	const p = path.dirname(src);
	esbuild.build({
		entryPoints: [src],
		outfile: `${p}/gen.js`,
		bundle: true,
		platform: 'node',
	});
});
