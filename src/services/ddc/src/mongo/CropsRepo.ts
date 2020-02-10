import {BaseMongoRepo} from "./BaseMongoRepo";
import {model, Schema} from "mongoose";
import {Crop} from "../models";

export const CropsSchema = new Schema({
    id: {type: String, auto: true },
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
