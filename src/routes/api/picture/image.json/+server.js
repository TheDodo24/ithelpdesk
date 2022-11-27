import fetch from "node-fetch";
import { HttpsProxyAgent } from "hpagent";

export async function GET() {
  let agent = new HttpsProxyAgent({
    rejectUnauthorized: false,
    proxy: "http://10.49.26.65:8080",
  });
  const res = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=IBYdDgndqUZTPkSr9FSz7JrybW6UAlYEyapD6uVc",
    {
      method: "GET",
    }
  );

  let json = JSON.parse(await res.text());

  let img = { src: json["hdurl"] };

  return new Response(JSON.stringify(img), {
    status: 200,
    statusText: "Returned NASA picture of the day",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}
