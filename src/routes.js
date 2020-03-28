const HOME = "/";
const SEARCH = "/search";

const IEX_URL = "https://cloud.iexapis.com/stable/stock";
const ALPHA_VANTAGE_QUERY_URL = "https://www.alphavantage.co/query";

export const routes = {
  home: HOME,
  iexStockUrl: ticker => {
    return `${IEX_URL}/${ticker}`;
  },
  search: SEARCH,
  alphaStocQueryUrl: ALPHA_VANTAGE_QUERY_URL
};
