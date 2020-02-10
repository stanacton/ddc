import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import axios from "axios";
import {AppResponse, AppStatus} from '../common';
import {JWTValidator} from "./JWTValidator";
import {JWTValidatorOpts} from "./JWTValidatorOpts";

export class JWTValidatorImpl implements JWTValidator {
    private opts: JWTValidatorOpts;
    constructor(opts: any = {}) {
        this.opts = opts;
    }

    verify(token: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (!token) {
                reject("token is required");
                return;
            }
            let cert: string = "";
            try {
                cert = await this.getCert();
            } catch (e) {
                return reject(e);
            }

            // @ts-ignore
            jwt.verify(token, cert, {algorithms: [this.opts.algorithm]}, (err: any, result: any) => {
                if (err) {
                    const resp = new AppResponse();
                    resp.appStatus = AppStatus.NotAuthorised;
                    resp.message = "AUTH Token is invalid";

                    return reject(resp);
                }

                return resolve(result);
            });
        });
    }

    getCert(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            if (!this.opts.publicCertPath && !this.opts.publicCertUrl) {
                return reject(new AppResponse(AppStatus.MissingField, "publicCertPath or publicCertUrl must be provided"));
            }
            try {
                if (this.opts.publicCertUrl) {
                    const resp = await axios.get(this.opts.publicCertUrl);
                    return resolve(resp.data);
                }
                const cert = fs.readFileSync(this.opts.publicCertPath, { encoding: "utf-8" });
                resolve(cert);
            } catch (e) {
                reject(e);
            }
        });
    }
}

