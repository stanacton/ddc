import {BaseMongoRepo} from "./BaseMongoRepo";
import {Order} from "../models";
import {model, Schema} from "mongoose";
import {ObjectId} from "bson";

export const OrderSchema = new Schema({
    id: {type: String,  default: function() { return new ObjectId() }  },
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
