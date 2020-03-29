import { stocks } from "../stocksDB";
import { routes } from "../routes";
import { callQuoteAPI, getDaily } from "./alphaAPIsController";

export const getHome = (req, res) => {
  res.render("home", { stocks });
};

export const getSearch = async (req, res) => {
  const {
    query: { symbol }
  } = req;
  try {
    const stock = await callQuoteAPI(symbol);
    console.log(stock);
    if (stock) {
      res.redirect(routes.stockDetail(symbol));
    } else {
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getStockDetail = async (req, res) => {
  const {
    params: { symbol }
  } = req;

  try {
    const stock = await callQuoteAPI(symbol);
    if (stock) {
      res.render("stockDetail", { stock });
    } else {
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
