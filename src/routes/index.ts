import express, {NextFunction, Request, Response, Router} from "express";
import ApiError from "@/utils/errors";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("SERVER IS RUNNING  :)");
});

router.use(
    async (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500).json({
            status: "error",
            message: err.message,
        });
    }
);

export default router;