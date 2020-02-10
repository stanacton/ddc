import {BaseMongoRepo} from "./BaseMongoRepo";
import {Order} from "../models";
import {model, Schema} from "mongoose";

export const OrderSchema = new Schema({
    id: {type: String, auto: true },
}, { strict: false});
const MongoCoOp = model('Orders', OrderSchema);

export class OrderRepo extends BaseMongoRepo<Order> {
    constructor() {
        super(MongoCoOp);
    }

    toType(doc: any): Order {
        return new Order(doc);
    }
}
