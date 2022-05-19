import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";
import * as os from "os";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
) {
  const hostname = req.query.displayHostname === "true" ? os.hostname() : "";

  const response = await axios.get<{ icon_url: string; value: string }>(
    "https://api.chucknorris.io/jokes/random"
  );

  const html = `<html><head><title>Joke</title></head><body style="text-align: center"><h1>Joke for u</h1>${
    hostname && "<h2>Hostname: " + hostname + "</h2>"
  }<table style="margin-left: auto; margin-right: auto;"><tr><td><img src="${
    response.data.icon_url
  }" /></td><td>${response.data.value}</td></tr></table></body></html>`;

  context.res = {
    body: html,
    headers: { "content-type": "text/html" },
  };
};

export default httpTrigger;