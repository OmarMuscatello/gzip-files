# gzip-files
This CLI tool will help you creating a Gzip version of web-app static files (HTML, CSS, JS).

This is useful when you don't want to compress the content on the fly since it adds load to the CPU of the server.

## Usage
Clone the repository and run the following command from the `src` folder using CLI (Node.js must be installed in your machine):
```
npm install
```
then run:
```
node index.js -s ./my-folder
```

## Options
### -s, --src [required]
The source folder on which the files to process are stored. Subfolders will be considered too.

### -e, --ext [optional, default to `"html,css,js"`]
The list of file extensions to consider, separated by comma without any point.

### --ow, --overwrite [optional, default to `false`]
If `true`, it replaces the source file with the gzipped one, maintaining the original file extension. If false, a new file with [filename].[ext].[gz] will be created.

### --ve, --verbose [optional, default to `false`]
If `true`, it enables the verbose mode.

## Examples
- Create a `.gz` file for each CSS file in the _build_ directory.
  ```
  node index.js -s ./build -e css
  ```
 
- Replace the JS files with a gzipped version, maintaining the same file name.
  ```
  node index.js -s ./build -e js --ow
  ```
