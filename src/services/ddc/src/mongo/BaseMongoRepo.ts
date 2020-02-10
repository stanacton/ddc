import {Repo} from "../services/Repo";
import {Document, Model} from 'mongoose';
import {AppResponse, AppStatus} from "../common";

export abstract class BaseMongoRepo<T> implements Repo<T> {
    protected model: Model<Document>;

    constructor(model: Model<Document>) {
        this.model = model;
    }

    abstract toType(doc: any): T;

    async create(item: T): Promise<T> {
        const doc = new this.model(item);
        await doc.save();

        return this.toType(doc);
    }

    async delete(id: string): Promise<AppResponse> {
        const response = new AppResponse(AppStatus.Success);
        await this.model.deleteOne({id: id });
        return response;
    }

    async get(id: string): Promise<T> {
        const item = await this.model.findOne({id: id});
        return this.toType(item);
    }

    async list(): Promise<T[]> {
        const items = await this.model.find();

        if (items) {
            return items.map(this.toType) as T[];
        } else {
            return [];
        }
    }

    async update(id: string, item: T): Promise<T> {
        const doc = new this.model(item);
        await this.model.updateOne({ id: id }, doc);

        return this.toType(doc);
    }
}
