import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as EventEmitter from 'events';
import logger from '../config/logger';

class dirwatcher extends EventEmitter {
    constructor() {
        super();
        this.modifiedFiles = [];
        this.modificationDates = {};
    }

    watch(path, delay) {   
        const timeout = setInterval(()=> {
            this.modifiedFiles = [];

            fs.stat(path, async (err, stat) => {
                if (err) {
                    logger.error(err.message);
                    throw err;
                }

                if (stat.isDirectory()) {
                    const fileStatsPromises = await this.checkDir(path);
                } else {
                    this.checkFileStat(path).then(() => {
                        if (this.modifiedFiles.length) {
                            this.emitEvent('change', this.modifiedFiles);
                        }
                    })
                }          
            });

        }, delay);
    }

    
    checkDir(dirPath) { 
        const promisifiedStats = [];

        fs.readdir(dirPath, (err, files) => {
            if (err) {
                logger.error(err.message);
                throw err;
            }

            files.forEach((filename) => {
                const filePath = path.join(dirPath, filename);
                promisifiedStats.push(this.checkFileStat(filePath));
            });

            Promise.all(promisifiedStats).then(() => {
                if (this.modifiedFiles.length) {
                    this.emitEvent('changed', this.modifiedFiles);
                }
            }); 
        });
    }

    checkFileStat(filePath) {
        const stat = util.promisify(fs.stat); 

        return stat(filePath).then((stat) => { 
            if (this.modificationDates[filePath] != stat.mtime.toString()) {
                this.modifiedFiles.push(filePath);
                this.modificationDates[filePath] = stat.mtime.toString();
            } 
        });
    }

    emitEvent(event, params) {
        this.emit(event, params);
    }
}

export default dirwatcher;