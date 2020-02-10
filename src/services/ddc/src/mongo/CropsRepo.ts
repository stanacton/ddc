import {BaseMongoRepo} from "./BaseMongoRepo";
import {model, Schema} from "mongoose";
import {Crop} from "../models";
import {ObjectId} from "bson";

export const CropsSchema = new Schema({
    id: {type: String, default: function() { return new ObjectId() } },
}, { strict: false});
const MongoCrops = model('Crops', CropsSchema);

export class CropsRepo extends BaseMongoRepo<Crop> {
    constructor() {
        super(MongoCrops);
    }

    toType(doc: any): Crop {
        return new Crop(doc);
    }
}
