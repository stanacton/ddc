import {BaseService} from "./BaseService";
import {Repo} from "./Repo";
import {Crop} from "../models";

export class CropsSvc extends BaseService<Crop> {
    constructor(repo: Repo<Crop>) {
        super(repo);
    }
}
