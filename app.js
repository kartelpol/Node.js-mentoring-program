import logger from './config/logger';
import convert from './src/utils/convertCsvToJson';
import * as csvToJson from 'convert-csv-to-json';
import * as config from './config/taskInfo.json';

import { Product, User } from 'models';

import Dirwatcher from './src/dirwatcher';
import Importer from './src/importer';

logger.info(config.name);

const product = new Product();
const user = new User();

const watchModule = new Dirwatcher();
const importModule = new Importer();

watchModule.on('changed', (path) => { 
    importModule.import(path).then(dataArr => {
        dataArr.forEach(data => logImports(data, 'ASYNC'))
    })
        .catch(err => logger.error(err));

    const importedData = importModule.importSync(path);
    //console.log(importedData);
    logImports(importedData, 'SYNC');
});

watchModule.watch(process.argv.PATH = './data', process.argv.DELAY = 2500);


function logImports(data, method) {
    logger.info(`-------------------------${method}-----------------------------`);

    const json = convert(data);
    json.forEach((raw, index) => {
        if (index === --json.length && index > 100) {
            logger.info(`...${json.length - 100} items more`);
        } else if (index <= 100) logger.info(raw);
    });
}