import { HttpsProxyAgent } from "hpagent";
import fetch from "node-fetch";

// @ts-ignore
export async function GET({ url }) {
  let agent = new HttpsProxyAgent({
    rejectUnauthorized: false,
    proxy: "http://10.49.26.65:8080",
  });
  let random = Math.floor(Math.random() * 4);
  let resp;
  let text;
  if (random == 0) {
    resp = await fetch("https://api.quotable.io/random?maxLength=200", {
      method: "GET",
    });
    const res = JSON.parse(await resp.text());
    text = JSON.stringify({
      text: res["content"],
      author: res["author"],
    });
  } else {
    resp = await fetch(
      url.protocol +
        "//" +
        url.hostname +
        ":" +
        url.port +
        "/api/quotes/marxquotes.json",
      {
        method: "GET",
      }
    );
    text = await resp.text();
  }
  if (resp.status == 200) {
    return new Response(text, {
      status: 200,
      statusText: "Returned quote",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }
}
