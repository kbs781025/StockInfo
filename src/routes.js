const HOME = "/";
const SEARCH = "/search";
const STOCKS = "/stocks";
const STOCK_DETAIL = "/:ticker";

const IEX_URL = "https://cloud.iexapis.com/stable/stock";
const ALPHA_VANTAGE_QUERY_URL = "https://www.alphavantage.co/query";

export const routes = {
  home: HOME,
  iexStockUrl: ticker => {
    return `${IEX_URL}/${ticker}`;
  },
  search: SEARCH,
  stocks: STOCKS,
  stockDetail: ticker => {
    return ticker ? `/stocks/${ticker}` : STOCK_DETAIL;
  },
  alphaStocQueryUrl: ALPHA_VANTAGE_QUERY_URL
};
