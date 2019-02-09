import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as EventEmitter from 'events';
import logger from '../config/logger';

class Dirwatcher extends EventEmitter {
    constructor() {
        super();
        this.pathsOfModifiedFiles = [];
        this.modificationDates = {};
    }

    /**
     * Checks file or files, if a directory is passed, for modification per a set time interval
     * @param {string} path 
     * @param {number|string} delay 
     * @returns timerId to stop the set Interval if needed
     */
    watch(path, delay) {   
        const intervalId = setInterval(()=> {
            this.pathsOfModifiedFiles = [];

            fs.stat(path, (err, stat) => {
                if (err) {
                    logger.error(err.message);
                    throw err;
                }

                if (stat.isDirectory()) {
                    this.checkDir(path);
                } else {
                    this.checkFileStat(path).then(() => {
                        if (this.pathsOfModifiedFiles.length) {
                            this.emitEvent('change', this.pathsOfModifiedFiles);
                        }
                    })
                }          
            });

        }, delay);

        return intervalId;
    }

    /**
     * Goes through all files in the directory
     * @param {string} dirPath 
     * @returns promise of the checked for modification files stats
     */
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
                if (this.pathsOfModifiedFiles.length) {
                    this.emitEvent('changed', this.pathsOfModifiedFiles);
                }
            }); 
        });
    }

    /**
     * Check file stat at a given path 
     * @param {string} dirPath 
     * @returns promise of the file stat
     */
    checkFileStat(filePath) {
        const stat = util.promisify(fs.stat); 

        return stat(filePath).then((stat) => { 
            if (this.modificationDates[filePath] != stat.mtime.toString()) {
                this.pathsOfModifiedFiles.push(filePath);
                this.modificationDates[filePath] = stat.mtime.toString();
            } 
        });
    }

    emitEvent(event, params) {
        this.emit(event, params);
    }
}

export default Dirwatcher;