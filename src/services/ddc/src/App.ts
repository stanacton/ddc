import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {IndexRouter} from "./routes";

class App  {
    public app: express.Application;

    constructor() {
        this.app = express();
        App.setupExpress(this.app);
    }

    private static setupExpress(app: express.Application) {
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

        app.use('/', IndexRouter.router());
    }
}

export default new App();
