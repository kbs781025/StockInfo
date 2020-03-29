import { stocks } from "../stocksDB";
import { routes } from "../routes";
import { getQuote, getDaily } from "./alphaAPIsController";

export const getHome = (req, res) => {
  res.render("home", { stocks });
};

export const getSearch = async (req, res) => {
  const {
    query: { ticker: symbol }
  } = req;

  try {
    const stock = await getQuote(symbol);

    if (stock) {
      res.redirect(routes.stockDetail(symbol));
    } else {
      res.render("home");
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getStockDetail = async (req, res) => {
  const {
    params: { ticker: symbol }
  } = req;

  try {
    const stock = await getQuote(symbol);

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
