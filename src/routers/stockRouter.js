import express from "express";
import { routes } from "../routes";
import { getStockDetail } from "../controllers/stockInfoController";

const stockRouter = express.Router();

stockRouter.get(routes.stockDetail(), getStockDetail);

export default stockRouter;
