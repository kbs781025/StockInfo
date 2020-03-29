import axios from "axios";
import { routes } from "./routes";

export const INTRADAY = "TIME_SERIES_INTRADAY";
export const DAILY = "TIME_SERIES_DAILY";
export const QUOTE = "GLOBAL_QUOTE";
export const SEARCH = "SYMBOL_SEARCH";

export const getQuote = async symbol => {
  const response = await axios.get(routes.alphaStocQueryUrl, {
    params: {
      function: QUOTE,
      symbol,
      apikey: process.env.ALPHA_VANTAGE_SECRET
    }
  });

  const data = response.data["Global Quote"];
  if (data) {
    return { symbol, price: data["05. price"] };
  }

  return {};
};

export const getDaily = async symbol => {
  const response = await axios.get(routes.alphaStocQueryUrl, {
    params: {
      function: DAILY,
      symbol,
      apikey: process.env.ALPHA_VANTAGE_SECRET
    }
  });

  const data = response.data["Time Series (Daily)"];
  if (data) {
    let datePriceArray = [];

    const priceKeys = Object.keys(data);
    for (let keyIndex = priceKeys.length - 1; keyIndex >= 0; --keyIndex) {
      const key = priceKeys[keyIndex];
      datePriceArray.push({ date: key, price: data[key]["4. close"] });
    }
    return { symbol, datePriceArray };
  }

  return {};
};
