const { Writable } = require('stream');
const { Transform } = require('stream');
const { createReadStream, createWriteStream, readdir, access } = require('fs'); 
const {join, relative, extname} = require('path');
const csvToJsonConverter = require('csvtojson');
const multistream = require('multistream');

const BUNDLE_CSS_NAME = 'bundle.css';
const FINAL_CSS_NAME = 'end-bundle-with-this.css';

function reverse() {
    const outStream = new Writable({
        write(chunk, encoding, callback) {
          process.stdout.write(chunk.toString().split("").reverse().join(""));
          callback();
        }
    });
      
    process.stdin.pipe(outStream);
}

function transform() {
    const upperCaseTransformingStream = new Transform({
        transform(chunk, encoding, callback) {
          this.push(chunk.toString().toUpperCase());
          callback();
        }
      });
      
      process.stdin.pipe(upperCaseTransformingStream).pipe(process.stdout);
}

function outputFile(filePath) {
    filePath = join(__dirname, filePath);

    try {
        const src = createReadStream(filePath);
        src.pipe(process.stdout);
    } catch (e) {
        console.error(e);
    }
}

function convertFromFile(filePath) {
    filePath = join(__dirname, filePath);

    if (extname(filePath) === '.csv') {
        try {
            const readStream = createReadStream(filePath);
            readStream.pipe(csvToJsonConverter()).pipe(process.stdout);            
        } catch(e) {
            console.error(e);
        }
    } else {
        console.error('FORMAT ERROR. EXPECTED .CSV FILE');
    }
}

function convertToFile(filePath) {
    filePath = join(__dirname, filePath);
    const outputFile = `${filePath.slice(0, filePath.indexOf('.csv'))}.json`;

    if (extname(filePath) === '.csv') {
        try {
            const readStream = createReadStream(filePath);
            const writeStream = createWriteStream(outputFile);
            readStream.pipe(csvToJsonConverter()).pipe(writeStream);
            
        } catch(e) {
            console.error(e);
        }
    } else {
        console.error('FORMAT ERROR. EXPECTED .CSV FILE');
    }
}

async function buildCss(dirPath) {
    const relativeDirPath = relative(__dirname, dirPath);
    const outputFile = join(__dirname, relativeDirPath, BUNDLE_CSS_NAME);
    dirPath = join(__dirname, relativeDirPath);

    const styleStreams = await getCssStreamsFromDir(dirPath);
    styleStreams.push(getFinalCssStream());
 
    const writeStream = createWriteStream(outputFile);

    multistream(styleStreams).pipe(writeStream);
}

function getCssStreamsFromDir(dirPath) {
    const styleStreams = [];

    return new Promise((resolve, reject) => {
        readdir(dirPath, (err, files) => {
            if (err) {
                reject('Unable to scan directory: ' + err);
            } 

            files.forEach(file => {
                const filePath = join(dirPath, file);

                if (extname(file) === '.css' && file !== BUNDLE_CSS_NAME) {
                    styleStreams.push(createReadStream(filePath));
                } 
            });

            resolve(styleStreams);
        });
    });
}

function getFinalCssStream() {
    const requestedCSSPath = join(__dirname, FINAL_CSS_NAME);
    try {
        return readStream = createReadStream(requestedCSSPath);
    } catch(e) {
        throw e;
    }
}

module.exports = {
    reverse,
    transform,
    outputFile,
    convertFromFile,
    convertToFile,
    buildCss,
}