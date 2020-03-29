const HOME = "/";
const SEARCH = "/search";

const STOCKS = "/stocks";
const STOCK_DETAIL = "/:symbol";

const API = "/api";
const API_GET_QUOTE = "/getQuote/:symbol";
const API_GET_DAILY = "/getDaily/:symbol";

const IEX_URL = "https://cloud.iexapis.com/stable/stock";
const ALPHA_VANTAGE_QUERY_URL = "https://www.alphavantage.co/query";

export const routes = {
  home: HOME,
  iexStockUrl: symbol => {
    return `${IEX_URL}/${symbol}`;
  },
  search: SEARCH,
  stocks: STOCKS,
  stockDetail: symbol => {
    return symbol ? `/stocks/${symbol}` : STOCK_DETAIL;
  },
  api: API,
  apiQuote: API_GET_QUOTE,
  apiDaily: API_GET_DAILY,
  alphaStocQueryUrl: ALPHA_VANTAGE_QUERY_URL
};
