const args = process.argv.slice(2);
const esbuild = require('esbuild');

const configs = [
  {
    entryPoint: 'src/popup/index.tsx',
    outfile: 'extension/popup.js'
  }
];

configs.forEach(config => {
  esbuild.build({
    entryPoints: [config.entryPoint],
    outfile: config.outfile,
    bundle: true,
    watch: args.includes('watch'),
    minify: args.includes('prod')
  }).catch(() => process.exit(1))
});
