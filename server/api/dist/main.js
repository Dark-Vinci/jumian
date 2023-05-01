"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWinston = void 0;
const cluster_1 = __importDefault(require("cluster"));
const process_1 = __importDefault(require("process"));
const os_1 = require("os");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const app_module_1 = require("./app.module");
const winston_1 = require("winston");
const common_1 = require("@nestjs/common");
const winston = require("winston");
const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};
const initWinston = (apiTitle) => {
    const logger = (0, winston_1.createLogger)({
        level: 'debug',
        levels: logLevels,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.colorize(), winston.format.align()),
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
    if (process_1.default.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }
    return logger;
};
exports.initWinston = initWinston;
class Application {
    static async start() {
        switch (true) {
            case cluster_1.default.isPrimary: {
                common_1.Logger.log(`Primary ${process_1.default.pid} is running`);
                for (let i = 0; i < 1; i++) {
                    cluster_1.default.fork();
                }
                cluster_1.default.on('exit', (worker, code, signal) => {
                    common_1.Logger.error(`worker ${worker.process.pid} died, code ${code}, signal ${signal}`);
                });
                break;
            }
            default: {
                const app = await core_1.NestFactory.create(app_module_1.AppModule, {
                    logger: nest_winston_1.WinstonModule.createLogger({
                        instance: (0, exports.initWinston)('api'),
                    }),
                });
                await app.listen(3002, 'localhost', async () => {
                    const url = await app.getUrl();
                    common_1.Logger.log(`Application running on url ${url}, on worker with pid: ${process_1.default.pid}`);
                });
            }
        }
    }
}
Application.numCPUs = (0, os_1.cpus)().length;
Application.start().then((_el) => { });
//# sourceMappingURL=main.js.map