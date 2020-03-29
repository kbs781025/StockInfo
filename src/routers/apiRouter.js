import express from "express";
import { routes } from "../routes";
import { getDaily } from "../controllers/alphaAPIsController";

const apiRouter = express.Router();

apiRouter.get(routes.apiDaily, getDaily);

export default apiRouter;
