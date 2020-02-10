import {BaseService} from "./BaseService";
import {Order} from "../models";
import {Repo} from "./Repo";

export class OrderSvc extends BaseService<Order> {
    constructor(repo: Repo<Order>) {
        super(repo);
    }
}
