const fetch = require("node-fetch");
const urlencode = require("urlencode");
const SEARCH_ENDPOINT =
  "https://api.clinicaltrialskorea.com/api/v1/search-conditions/";

exports.handler = async (event) => {
  try {
    const { queryStringParameters } = event;
    const parameters = Object.entries(queryStringParameters)
      .map(([key, value]) => `${key}=${urlencode.encode(value)}`)
      .join("&")
      .concat(`&key=${process.env.API_KEY}`);
    const URI = `${SEARCH_ENDPOINT}?${parameters}`;
    const response = await fetch(URI);
    const { statusCode, statusText, ok, headers } = response;
    const body = JSON.stringify(await response.json());

    headers["Access-Control-Allow-Origin"] = process.env.HOST;

    return {
      statusCode,
      statusText,
      ok,
      headers,
      body,
    };
  } catch (error) {
    return {
      statusCode: 404,
      statusText: error.message,
      ok: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
