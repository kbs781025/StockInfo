import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { routes } from "./routes";
import globalRouter from "./routers/globalRouter";
import { localMiddleWare } from "./middleWares";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "statics")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(localMiddleWare);

app.use(routes.home, globalRouter);
app.listen(port, () => console.log(`Listening on ${port}`));
