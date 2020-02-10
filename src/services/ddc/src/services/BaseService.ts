import {Repo} from "./Repo";
import {Service} from "./Service";
import {AppResponse} from "../common";

export class BaseService<T> implements Service<T> {
    protected repo: Repo<T>;
    constructor(repo: Repo<T>) {
        this.repo = repo;
    }

    async get(id: string): Promise<T> {
        return await this.repo.get(id);
    }

    async list(): Promise<T[]> {
        return await this.repo.list();
    }

    async create(item: T): Promise<T> {
        return await this.repo.create(item)
    }

    async update(id: string, item: T): Promise<T> {
        return await this.repo.update(id, item)
    }

    async delete(id: string): Promise<AppResponse> {
        return await this.repo.delete(id);
    }
}
