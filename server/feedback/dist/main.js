"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const process_1 = __importDefault(require("process"));
const os_1 = require("os");
const path_1 = require("path");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const logger_1 = require("sdk/dist/logger");
const sdk_1 = require("sdk");
const app_module_1 = require("./startup/app.module");
const nest_winston_1 = require("nest-winston");
class Application {
    static async start() {
        switch (true) {
            case cluster_1.default.isPrimary: {
                common_1.Logger.log(`Primary ${process_1.default.pid} is running`);
                if (process_1.default.env.NODE_ENV === sdk_1.AppEnv.DEVELOPMENT) {
                    this.numCPUs = 1;
                }
                for (let i = 0; i < this.numCPUs; i++) {
                    cluster_1.default.fork();
                }
                cluster_1.default.on('exit', (worker, code, signal) => {
                    common_1.Logger.log(`worker ${worker.process.pid} died, code ${code}, signal ${signal}`);
                    const numWorkers = Object.keys(cluster_1.default.workers).length;
                    if (process_1.default.env.NODE_ENV !== sdk_1.AppEnv.DEVELOPMENT &&
                        numWorkers < this.numCPUs) {
                        cluster_1.default.fork();
                    }
                });
                break;
            }
            default: {
                const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
                    transport: microservices_1.Transport.GRPC,
                    options: this.options,
                    logger: nest_winston_1.WinstonModule.createLogger({
                        instance: (0, logger_1.initWinston)(sdk_1.RPCServiceName.FEEDBACK),
                    }),
                });
                await app.listen();
                common_1.Logger.log(`Application running on url localhost:${3003}, on worker with pid: ${process_1.default.pid}`);
            }
        }
    }
}
Application.numCPUs = (0, os_1.cpus)().length;
Application.options = {
    url: sdk_1.RPCUrl.FEEDBACK,
    package: sdk_1.RPCServiceName.FEEDBACK,
    protoPath: (0, path_1.join)(__dirname, sdk_1.ProtoPath.FEEDBACK),
    loader: {
        enums: String,
        objects: true,
        arrays: true,
    },
};
Application.start().then((_el) => { });
//# sourceMappingURL=main.js.map