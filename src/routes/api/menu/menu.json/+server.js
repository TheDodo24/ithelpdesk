import fetch from "node-fetch";
import { HttpsProxyAgent } from "hpagent";

export async function GET() {
  let agent = new HttpsProxyAgent({
    rejectUnauthorized: false,
    proxy: "http://10.49.26.65:8080",
  });
  const res = await fetch("https://aramarkio.vercel.app/api/menu/menu.json", {
    method: "GET",
    agent: agent,
  });

  let json = JSON.parse(await res.text());
  if (res.status == 200 && json.length > 0) {
    let menus = json.filter(function filter(
      /** @type {{ [x: string]: any; }} */ item
    ) {
      return item["day"] == 0;
    });

    menus.forEach((/** @type {{ [x: string]: string; }} */ element) => {
      element["title"] = element["title"].replaceAll("<br>", "");
      element["text"] = element["text"].replaceAll("<br>", "");
    });

    return new Response(JSON.stringify(menus), {
      status: 200,
      statusText: "Returned aramark menu for today",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }
  return new Response("", {
    status: 400,
    statusText: "Error fetching aramark menu",
  });
}
