import {AppStatus} from "./AppStatus";

export default class AppResponse {
    appStatus: AppStatus;
    message: string;
    innerError: any;

    constructor(status: AppStatus = AppStatus.Unknown, message: string = "") {
        this.appStatus = status;
        this.message = message;
    }
}
