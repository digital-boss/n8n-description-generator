require('esbuild').build({
	entryPoints: ['nodes/{{nodeName}}/descriptions/gen.ts'],
	outfile: 'nodes/{{nodeName}}/descriptions/gen.js',
	bundle: true,
	platform: 'node',
});
