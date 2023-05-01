import winston, {createLogger} from 'winston';

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };

export const initWinston = (apiTitle: string) => {
    const logger = createLogger({
      level: 'debug',
      levels: logLevels,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize(),
        winston.format.align(),
      ),
      defaultMeta: { service: apiTitle },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
      exceptionHandlers: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'exceptions.log' }),
      ],
      rejectionHandlers: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'rejections.log' }),
      ],
    });
  
    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  
    return logger;
  };