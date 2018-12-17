import * as fs from 'fs';
import * as util from 'util';
import logger from '../config/logger.js';

class importer {
    import(files) {
        const modifiedFiles = [];
        const readFile = util.promisify(fs.readFile);

        files.forEach((file) => {
            const filePromise = readFile(file, 'utf8');  
            modifiedFiles.push(filePromise);
        });

        return Promise.all(modifiedFiles);
    }

    importSync(files) {
        const modifiedData = [];

        files.forEach((filename) => {
            try {
                const data = fs.readFileSync(filename, 'utf8');
                modifiedData.push(data);
            } 
            catch(err) {
                logger.error(`Error reading ${filename}`);
                logger.error(err);
                throw new Error(err);
            }
        });  

        return modifiedData;
    }
}

export default importer;