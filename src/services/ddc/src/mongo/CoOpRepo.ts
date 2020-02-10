import {BaseMongoRepo} from "./BaseMongoRepo";
import {CoOp} from "../models";
import {model, Schema} from "mongoose";
import {ObjectId} from "bson";

export const CoOpSchema = new Schema({
    id: {type: String, default: function() { return new ObjectId() }  },
}, { strict: false});
const MongoCoOp = model('CoOp', CoOpSchema);

export class CoOpRepo extends BaseMongoRepo<CoOp> {
    constructor() {
        super(MongoCoOp);
    }

    toType(doc: any): CoOp {
        return new CoOp(doc);
    }
}
