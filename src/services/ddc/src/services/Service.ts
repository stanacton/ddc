import {AppResponse} from "../common";

export interface Service<T> {
    get(id: string): Promise<T>;

    list(): Promise<T[]>;

    create(item: T): Promise<T>;

    update(id: string, item: T): Promise<T>;

    delete(id: string): Promise<AppResponse>;
}
