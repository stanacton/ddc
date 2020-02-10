export class Crop {
    id: string;
    Name: string;
    constructor(item: any = {}) {
        this.id = item.id;
        this.Name = item.Name;
    }
}
