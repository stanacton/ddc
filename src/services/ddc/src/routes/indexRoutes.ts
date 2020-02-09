import {Request, Response} from "express";
import {Router} from "express";

export default class IndexRouter {
    public static router(): Router {
        const router = Router();

        router.get("/", (req: Request, res: Response) => {
            res
                .json({})
                .status(200)
                .end();
        });

        return router;
    }
}
