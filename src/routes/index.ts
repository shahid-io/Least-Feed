import { Router } from "express"
import authRoutes from "./auth.routes";
import feedRoutes from "./feed.routes";

const apiRouter = Router();

apiRouter.use('/auth', authRoutes)
apiRouter.use('/feeds', feedRoutes)

export default apiRouter;