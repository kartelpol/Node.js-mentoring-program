const { createReadStream, createWriteStream, readdir } = require('fs'); 
const { join, relative, extname } = require('path');

const csvToJsonConverter = require('csvtojson');
const through2 = require('through2');
const multistream = require('multistream');

const errorMsgs = require('./errorMsgs');

const BUNDLE_CSS_NAME = 'bundle.css';
const FINAL_CSS_NAME = 'end-bundle-with-this.css';

function reverse() {   
    process.stdin
        .pipe(through2(reverseData))
        .pipe(process.stdout);
}

function reverseData(chunk, enc, next) {
    const reversedData = chunk
        .toString()
        .split("")
        .reverse()
        .join("");

        this.push(reversedData);
        next();
}

function transform() {   
      process.stdin
        .pipe(through2(transformData))
        .pipe(process.stdout);
}

function transformData(chunk, enc, next) {
    const transformedData = chunk
        .toString()
        .toUpperCase();

        this.push(transformedData);
        next();
}

function outputFile(filePath) {
    filePath = join(__dirname, filePath);

    try {
        const inputStream = createReadStream(filePath);
        inputStream.pipe(process.stdout);
    } catch (e) {
        console.error(e);
    }
}

function convertFromFile(filePath) {
    streamJSONFromCSVFile(filePath, process.stdout);
}

function convertToFile(filePath) {
    const outputFile = `${filePath.slice(0, filePath.indexOf('.csv'))}.json`;
    const writeStream = createWriteStream(outputFile);
    
    streamJSONFromCSVFile(filePath, writeStream);
}

function streamJSONFromCSVFile(inputFilePath, outputStream) {
    inputFilePath = join(__dirname, inputFilePath);

    if (extname(inputFilePath) === '.csv') {
        try {
            const readStream = createReadStream(inputFilePath);
            readStream.pipe(csvToJsonConverter()).pipe(outputStream);
            
        } catch(e) {
            console.error(e);
        }
    } else {
        console.error(errorMsgs.params.wrong_extention('.csv'));
    }
} 

async function buildCss(dirPath) {
    const relativeDirPath = relative(__dirname, dirPath);
    const outputFile = join(__dirname, relativeDirPath, BUNDLE_CSS_NAME);
    dirPath = join(__dirname, relativeDirPath);

    try {
        const styleStreams = await getCssStreamsFromDir(dirPath);
        styleStreams.push(getFinalCssStream());
        
        const writeStream = createWriteStream(outputFile);
        multistream(styleStreams).pipe(writeStream);
    } catch(e) {
        throw(e);
    }
}

function getCssStreamsFromDir(dirPath) {
    return new Promise((resolve, reject) => {
        const styleStreams = [];

        readdir(dirPath, (err, files) => {
            if (err) {
                reject(errorMsgs.params.wrong_path + err);
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
        return createReadStream(requestedCSSPath);
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