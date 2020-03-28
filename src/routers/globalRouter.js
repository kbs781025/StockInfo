import express from "express";
import { routes } from "../routes";
import { getHome, getSearch } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.search, getSearch);

export default globalRouter;
