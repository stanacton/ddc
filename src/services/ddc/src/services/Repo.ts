import {AppResponse} from "../common";

export interface Repo<T> {
    list(): Promise<T[]>;
    get(id: string): Promise<T>;
    delete(id: string): Promise<AppResponse>;
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<T>;
}
