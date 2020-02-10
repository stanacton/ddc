import {Response} from "express";
import {AppResponse, AppStatus} from "../common";

export default class StatusEnumResponse {
    static send(res: Response, appResponse: any) {
        try {
            console.error(JSON.stringify(appResponse))
        } catch (e) {
            console.error(appResponse);
        }
        if (!appResponse.appStatus && !(appResponse instanceof AppResponse)) {
            let resp = new AppResponse();
            resp.appStatus = AppStatus.UnknownError;

            if (typeof appResponse ==  "string") {
                resp.message = appResponse;
            }

            if (appResponse instanceof Error) {
                resp.message = appResponse.toString();
            }

            console.log(JSON.stringify(appResponse.toString(),null, 4));
            return res.status(500).json(resp);
        }

        switch(appResponse.appStatus) {
            case AppStatus.NotFound:
                res.status(404);
                break;
            case AppStatus.AlreadyExists:
                res.status(409);
                break;
            case AppStatus.NotAuthorised:
                res.status(401);
                break;
            case AppStatus.MissingField:
                res.status(400);
                break;
            case AppStatus.Success:
                res.status(200);
                break;
            default:
                const _appResponse = new AppResponse();
                _appResponse.appStatus = AppStatus.Error;
                _appResponse.innerError = appResponse;
                res.status(500);
                break;
        }
        console.log(appResponse);
        res.json(appResponse);
        res.end();
    }
}
