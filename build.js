const args = process.argv.slice(2);

require('esbuild').build({
    entryPoints: ['src/popup/index.tsx'],
    bundle: true,
    outfile: 'extension/popup.js',
    watch: args.includes('watch')
  }).catch(() => process.exit(1))