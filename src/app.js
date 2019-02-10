import logger from '../config/logger';
import convert from './utils/convertCsvToJson';
import * as config from './config/taskInfo.json';

import { Product, User } from 'models';

import Dirwatcher from './dirwatcher';
import Importer from './importer';

logger.info(config.name);

const product = new Product();
const user = new User();

const watchModule = new Dirwatcher();
const importModule = new Importer();

watchModule.watch(process.argv.PATH = './data', process.argv.DELAY = 2500);

watchModule.on('changed', (filesPaths) => { 
    filesPaths.forEach(filePath => onFileChange(filePath));
});

function onFileChange(filePath) {
    importModule.import(filePath).then(data => logImports(data, 'ASYNC'))
        .catch(err => logger.error(err));

    const importedData = importModule.importSync(filePath);
    logImports(importedData, 'SYNC');
}

function logImports(data, method) {
    logger.info(`-------------------------${method}-----------------------------`);

    const json = convert(data);
    json.forEach((raw, index) => {
        if (index === --json.length && index > 100) {
            logger.info(`...${json.length - 100} items more`);
        } else if (index <= 100) logger.info(raw);
    });
}