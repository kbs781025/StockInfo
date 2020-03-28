import { stocks } from "../stocksDB";
import { routes } from "../routes";
import { QUOTE } from "../alphaFunctions";
import axios from "axios";

export const getHome = (req, res) => {
  res.render("home", { stocks });
};

export const getSearch = async (req, res) => {
  const {
    query: { ticker: symbol }
  } = req;

  const response = await axios.get(routes.alphaStocQueryUrl, {
    params: {
      function: QUOTE,
      symbol,
      apikey: process.env.ALPHA_VANTAGE_SECRET
    }
  });

  if (response.data["Global Quote"]) {
    const data = response.data["Global Quote"];
    const stock = { symbol, price: data["05. price"] };
    res.render("search", { stocks: [stock] });
  } else {
    res.render("search");
  }
};

export const getStockDetail = (req, res) => {
  const {
    params: { ticker }
  } = req;
  console.log(req.params);
};
