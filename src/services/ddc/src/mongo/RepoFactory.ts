import mongoose from "mongoose";
import {AppResponse, AppStatus} from "../common";
import config from "config";
import {OrderRepo} from "./OrderRepo";
import {CoOpRepo} from "./CoOpRepo";
import {ParticipantRepo} from "./ParticipantRepo";
import {CropsRepo} from "./CropsRepo";

export default class RepoFactory {
    static retryCount: number = 0;

    static build(opts: MongoConfig = config.get("MongoConfig") as MongoConfig): any {
        return new Promise<any>(async (resolve, reject) => {
            this.tryConnect(opts, resolve, reject, this.retryCount);
        });
    }

    static tryConnect(opts: MongoConfig, resolve: any, reject: any, retryCount: number) {
        if (retryCount >= opts.maxRetries) {
            return reject(new AppResponse(AppStatus.Error, "Cannot Connect to Database"))
        }
        mongoose.connect(opts.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                const repos: any = {};

                repos.orderRepo = new OrderRepo();
                repos.coopRepo = new CoOpRepo();
                repos.crops = new CropsRepo();
                repos.participantRepo = new ParticipantRepo();

                resolve(repos);
            })
            .catch((e) => {
                console.log(e);
                retryCount++;
                setTimeout(RepoFactory.tryConnect, opts.retryInterval, opts, resolve, reject, retryCount);
            });
    }
}

export class MongoConfig {
    connectionString: string;
    maxRetries: number;
    retryInterval: number;
}
