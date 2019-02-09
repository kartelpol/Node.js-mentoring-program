import * as fs from 'fs';
import * as util from 'util';
import logger from '../config/logger.js';

class Importer {

    /**
     * Import file at the given path asynchroniously 
     * @param {string} filePath 
     * @returns promise of the readed file
     */
    import(filePath) {
        const readFile = util.promisify(fs.readFile);
        
        return readFile(filePath, 'utf8');  
    }

    /**
     * Import file at the given path synchroniously 
     * @param {string} filePath 
     * @returns readed file data
     */
    importSync(filePath) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            return fileData;
        } 
        catch(err) {
            logger.error(err, `Error reading ${filePath}`);
            throw new Error(err);
        }
    }
}

export default Importer;