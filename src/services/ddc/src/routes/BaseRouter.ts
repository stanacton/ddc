import {Request, Response} from "express";
import {Router} from "express";
import {Service} from "../services";
import StatusEnumResponse from "./AppResponses";

export class BaseRouter<T> {
    protected svc: Service<T>;
    public router: Router;

    constructor(svc: Service<T>) {
        this.svc = svc;
        this.router = Router();
        this.init(this.router);
    }

    static router<T>(svc: Service<T>) {
        const baseRouter = new BaseRouter<T>(svc);
        return baseRouter.router;
    }

    init(router: Router) {
        router.post("/", this.createHandler.bind(this));
        router.get ("/", this.listHandler.bind(this));
        router.put ("/:id", this.updateHandler.bind(this));
        router.get ("/:id", this.getHandler.bind(this));
        router.delete("/:id", this.deleteHandler.bind(this));
        return router;
    }

    async createHandler(req: Request, res: Response) {
        try {
            const item = req.body as T;
            const newItem = await this.svc.create(item);

            res
                .json(newItem)
                .status(200)
                .end();
        } catch (e) {
            StatusEnumResponse.send(res, e);
        }
    }

    async updateHandler(req: Request, res: Response) {
        try {
            const item = req.body as T;
            const id = req.params.id;
            const newItem = await this.svc.update(id, item);

            res
                .json(newItem)
                .status(200)
                .end();
        } catch (e) {
            StatusEnumResponse.send(res, e);
        }
    }

    async listHandler(req: Request, res: Response) {
        try {
            const items = await this.svc.list();

            res
                .json(items)
                .status(200)
                .end();
        } catch (e) {
            StatusEnumResponse.send(res, e);
        }
    }

    async getHandler(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const item = await this.svc.get(id);

            res
                .json(item)
                .status(200)
                .end()
        } catch (e) {
            StatusEnumResponse.send(res, e);
        }
    }

    async deleteHandler(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await this.svc.delete(id);

            res
                .json(response)
                .status(200)
                .end()
        } catch (e) {
            StatusEnumResponse.send(res, e);
        }
    }
}
