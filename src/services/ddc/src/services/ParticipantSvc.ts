import {BaseService} from "./BaseService";
import {Participant} from "../models";
import {Repo} from "./Repo";

export class ParticipantSvc extends BaseService<Participant> {
    constructor(repo: Repo<Participant>) {
        super(repo);
    }
}
