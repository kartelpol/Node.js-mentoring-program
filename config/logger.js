import { createLogger, format, transports }  from 'winston';

const logger = createLogger({
    format : format.printf(info => typeof info.message === 'object' ? JSON.stringify(info.message) : info.message),

    transports: [
        new transports.Console({
            level: 'info',
        }),
        new transports.File({ 
            filename: 'log',
            level: 'error'
         }),
    ] 
});

export default logger;
