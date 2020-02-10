import {NextFunction, Request, Response} from "express";
import {JWTValidator, JWTValidatorImpl, JWTValidatorOpts} from "../jwt";
import config from "config";
import {AppResponse, AppStatus} from "../common";
import AppResponses from "../routes/AppResponses";

export default class JWTValidatorMiddleware {
    static validator: JWTValidator;

    public static async validate(req: any, res: Response, next: NextFunction) {
        const token = JWTValidatorMiddleware.getToken(req);
        if (!token) {
            return JWTValidatorMiddleware.returnNotAuthorised(res);
        }
        try {
            const svc = JWTValidatorMiddleware.getValidator();
            const verifyResult = await svc.verify(token);
            if (!verifyResult.email) {
                return JWTValidatorMiddleware.returnNotAuthorised(res, "Bearer is not valid");
            }
            req.jwt = token;
            req.user = verifyResult;
            next();
        } catch (e) {
            AppResponses.send(res, e)
        }
    }

    public static getValidator(): JWTValidator {
        if (!this.validator) {
            const opts = config.get("JWTValidatorOpts") as JWTValidatorOpts;
            this.validator = new JWTValidatorImpl(opts);
        }

        return this.validator;
    }

    public static getToken(req: Request): string {
        const header = req.header("Authorization");
        if (!header || header.indexOf("Bearer ") !== 0 || header.length < 7) {
            return "";
        }

        return header.substr(7);
    }

    public static returnNotAuthorised(res: Response, message: string = "") {
        const resp = new AppResponse(AppStatus.NotAuthorised, message);

        res
            .status(401)
            .json(resp)
            .end();
    }
}
