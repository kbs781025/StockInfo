import axios from "axios";
import { routes } from "../routes";

const INTRADAY = "TIME_SERIES_INTRADAY";
const DAILY = "TIME_SERIES_DAILY";
const QUOTE = "GLOBAL_QUOTE";
const SEARCH = "SYMBOL_SEARCH";
const APICALL_LIMIT = 5; // per minute
let currentAPICalls = 0;
let previousMinute = 0;

function consumedAllAPI(data) {
  const minute = new Date().getMinutes();

  if (minute !== previousMinute) {
    currentAPICalls = 0;
    return false;
  }

  ++currentAPICalls;
  console.log("Current Call " + currentAPICalls);
  previousMinute = minute;

  if (currentAPICalls > 5) {
    return true;
  }

  return false;
}

export const callQuoteAPI = async symbol => {
  const response = await axios.get(routes.alphaStocQueryUrl, {
    params: {
      function: QUOTE,
      symbol,
      apikey: process.env.ALPHA_VANTAGE_SECRET
    }
  });
  const data = response.data["Global Quote"];
  if (consumedAllAPI()) {
    throw new Error("Consumed All API Calls");
  }

  if (data) {
    return { symbol, price: data["05. price"] };
  }

  return {};
};

export const callDailyAPI = async symbol => {
  const response = await axios.get(routes.alphaStocQueryUrl, {
    params: {
      function: DAILY,
      symbol,
      apikey: process.env.ALPHA_VANTAGE_SECRET
    }
  });

  const data = response.data["Time Series (Daily)"];
  if (consumedAllAPI()) {
    throw new Error("Consumed All API Calls");
  }

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

export const getDaily = async (req, res) => {
  const {
    params: { symbol }
  } = req;
  const response = await callDailyAPI(symbol);
  if (response) {
    res.json(response);
  }
  res.end();
};
