import { Participant } from "./Participant";

export class CoOp {
    Name: string;
    Participants: Participant[];
    Commodity: string;
    id: string;

    constructor(item: any = {}) {
        this.Participants = item.Participants || [];
        this.Name = item.Name;
        this.Commodity = item.Commodity;
        this.id = item.id;
    }

    totalCommited(): number {
        let total = 0;
        for (const p of this.Participants) {
            total += p.Quantity;
        }

        return total;
    }
}
