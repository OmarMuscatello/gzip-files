const gzip = require('./gzip');
const glob = require('glob');
const fs = require('fs');
const argv = require('yargs')
    .option('s', {
        alias: 'src',
        demandOption: true,
        describe: 'The folder path containing the files to process',
        type: 'string'
    })
    .option('e', {
        alias: 'ext',
        describe: 'The list of file extensions to consider',
        default: 'html,css,js',
        type: 'string'
    })
    .option('ow', {
        alias: 'overwrite',
        describe: 'If true, it replaces the source file with the gzipped one, maintaining the original extension. If false, a new file with [filename].[ext].[gz] will be created.',
        default: false,
        type: 'boolean'
    })
    .option('ve', {
        alias: 'verbose',
        describe: 'It enables the verbose mode.',
        default: false,
        type: 'boolean'
    })
    .check(argv => {

        if (!fs.existsSync(argv.src)) {
            throw new Error(`The specified folder '${argv.src}' does not exists.`);
        }

        const extensions = argv.ext;

        if (!extensions || extensions.trim().length === 0) {
            throw new Error('The specified ext parameter is not valid. Separate file extensions with comma, e.g. html,css,js');
        }

        return true;
    })
    .argv;

const folder = argv.src;
const extensions = argv.ext;
const overwrite = argv.overwrite;
const verbose = argv.verbose;

if (argv.verbose) {
    console.log('Provided options:');
    console.table({
        src: folder,
        ext: extensions,
        overwrite,
        verbose
    });
}

glob(`${folder}/**/*.{${extensions}}`, async (error, files) => {
    let totalFiles = 0;

    for (const filePath of files) {

        if (verbose) {
            console.log(`Processing file '${filePath}'`);
        }

        await gzip(filePath, overwrite, 'best');

        totalFiles++;
    }
    console.log('==========');
    console.log(`DONE: processed ${totalFiles} files`);
});