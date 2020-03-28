import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.set("view engine", "pug");
app.set("views", "./views");
app.get("/", (req, res) => res.render("home"));
app.listen(port, () => console.log(`Listening on ${port}`));
