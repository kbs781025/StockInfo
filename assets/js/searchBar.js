import { drawChart } from "./stockChart";

const searchContainer = document.getElementsByClassName("search__container")[0];
const search = document.getElementById("jsSearchForm");
const ALPHA_VANTAGE_QUERY_URL = "https://www.alphavantage.co/query";
const QUOTE = "SYMBOL_SEARCH";
const ALPHA_VANTAGE_SECRET = "IX8DO332KWLB37AN";
const socket = io();

function addTickerDropList(companyArray) {
  const existingList = searchContainer.querySelector("ui");
  if (existingList) {
    searchContainer.removeChild(existingList);
  }

  const ui = document.createElement("ui");
  ui.className = "search__company__list";
  for (const company of companyArray) {
    for (const prop of Object.keys(company)) {
      const li = document.createElement("li");
      li.className = "search__company__item";

      const anchor = document.createElement("a");
      anchor.href = `/stocks/${company["ticker"]}`;
      anchor.textContent = company[prop];
      li.appendChild(anchor);

      ui.appendChild(li);
    }
  }

  searchContainer.appendChild(ui);
}

function getCompanyArray(bestMatches) {
  let companyArray = [];
  for (const key in bestMatches) {
    const company = bestMatches[key];
    companyArray.push({
      ticker: company["1. symbol"],
      name: company["2. name"]
    });
  }

  return companyArray;
}

async function findTickers(event) {
  const input = event.target.value;
  let url = new URL(ALPHA_VANTAGE_QUERY_URL);
  const params = {
    function: QUOTE,
    keywords: input,
    apikey: ALPHA_VANTAGE_SECRET
  };
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url);
  if (response.ok) {
    const matches = await response.json();
    const tickers = getCompanyArray(matches["bestMatches"]);
    addTickerDropList(tickers);
  }
}

function handleSubmit(event) {
  const symbol = event.target.ticker.value;
  socket.emit("dailyrequest", symbol);
}

function init() {
  search.addEventListener("input", findTickers);
  search.addEventListener("submit", handleSubmit);
  socket.on("dailyReply", function(dailyData) {
    drawChart(dailyData);
  });
}

if (search) {
  init();
}
