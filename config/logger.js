import { createLogger, format, transports }  from 'winston';

const logger = createLogger({
    format : format.printf(info => typeof info.message === 'object' ? JSON.stringify(info.message, undefined, 2) : info.message),

    transports: [
        new transports.Console({
            level: 'info',
        }),
        new transports.File({ 
            filename: 'error.log',
            level: 'error'
         }),
    ] 
});

export default logger;
