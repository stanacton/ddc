import {BaseMongoRepo} from "./BaseMongoRepo";
import {Participant} from "../models";
import {model, Schema} from "mongoose";

export const ParticipantSchema = new Schema({
    id: {type: String, auto: true },
}, { strict: false});
const ParticipantCoOp = model('Participants', ParticipantSchema);

export class ParticipantRepo extends BaseMongoRepo<Participant> {
    constructor() {
        super(ParticipantCoOp);
    }

    toType(doc: any): Participant {
        return new Participant(doc);
    }
}
