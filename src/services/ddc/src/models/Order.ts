export class Order {
    id: string;
    Commodity: string;
    BidPrice: number;
    Quantity: string;
    Unit: string;
    BuyerID: string;

    constructor(item: any = {}) {
        this.id = item.id;
        this.Commodity = item.Commodity;
        this.BidPrice = item.BidPrice;
        this.Quantity = item.Quantity;
        this.Unit = item.Unit;
        this.BuyerID = item.BuyerID;
    }
}
