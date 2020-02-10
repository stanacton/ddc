import {BaseService} from "./BaseService";
import {CoOp} from "../models";
import {Repo} from "./Repo";

export class CoOpSvc extends BaseService<CoOp> {
    constructor(repo: Repo<CoOp>) {
        super(repo);
    }
}
