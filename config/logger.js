import { createLogger, format, transports }  from 'winston';

const logger = createLogger({
    format : format.printf(info => info.message),

    transports: [
        new transports.Console({
            level: 'info'
        }),
        new transports.File({ 
            filename: 'log',
            level: 'error'
         }),
    ] 
});

export default logger;
