import { HttpsProxyAgent } from "hpagent";
import fetch from "node-fetch";

export async function GET({ url }) {
  let agent = new HttpsProxyAgent({
    rejectUnauthorized: false,
    proxy: "http://10.49.26.65:8080",
  });
  let random = Math.floor(Math.random() * 3);
  let resp;
  if (random == 0) {
    resp = await fetch("https://api.quotable.io/random?maxLength=200", {
      method: "GET",
      agent: agent,
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
  }
  const text = await resp.text();
  if (resp.status == 200) {
    return new Response(text, {
      status: 200,
      statusText: "Returned Marx quote",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }
}
