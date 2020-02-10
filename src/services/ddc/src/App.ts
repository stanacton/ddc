import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {OrderRouter} from "./routes";
import {CoOpSvc, CropsSvc, OrderSvc, ParticipantSvc} from "./services";
import {RepoFactory} from "./mongo";
import {MongoConfig} from "./mongo/RepoFactory";
import config from 'config';
import CoOpRouter from "./routes/CoOpRouter";
import CropsRouter from "./routes/CropsRouter";
import ParticipantRouter from "./routes/ParticipantRouter";

class App  {
    public app: express.Application;

    constructor() {
        this.app = express();
        App.setupExpress(this.app);
    }

    private static async setupExpress(app: express.Application) {
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

        const services = await this.services();

        app.use('/api/co-ops', CoOpRouter.router(services.coOpSvc));
        app.use('/api/crops', CropsRouter.router(services.cropsSvc));
        app.use('/api/orders', OrderRouter.router(services.orderSvc));
        app.use('/api/participants', ParticipantRouter.router(services.participantSvc));
    }

    static async services() {
        const mongoConfig = config.get("MongoConfig") as MongoConfig;
        const repos = await RepoFactory.build(mongoConfig);

        const orderSvc = new OrderSvc(repos.orderRepo);
        const participantSvc = new ParticipantSvc(repos.participantRepo);
        const coOpSvc = new CoOpSvc(repos.coopRepo);
        const cropsSvc = new CropsSvc(repos.cropsRepo);

        return {
            orderSvc,
            participantSvc,
            coOpSvc,
            cropsSvc
        }
    }
}

export default new App();
