import { stocks } from "../stocksDB";
import { routes } from "../routes";
import { QUOTE, DAILY, getQuote, getDaily } from "../alphaAPIs";
import axios from "axios";

export const getHome = (req, res) => {
  res.render("home", { stocks });
};

export const getSearch = async (req, res) => {
  const {
    query: { ticker: symbol }
  } = req;

  const stock = await getQuote(symbol);

  if (stock) {
    res.render("stockDetail", { stock });
  } else {
    res.render("home");
  }
};

export const getStockDetail = async (req, res) => {
  const {
    params: { ticker: symbol }
  } = req;

  console.log(req.params);

  const stock = await getQuote(symbol);

  if (stock) {
    res.render("stockDetail", { stock });
  } else {
    res.redirect(routes.home);
  }
};
