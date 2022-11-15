import fetch from "node-fetch";
import { HttpsProxyAgent } from "hpagent";

export async function GET() {
  let agent = new HttpsProxyAgent({
    rejectUnauthorized: false,
    proxy: "http://10.49.26.65:8080",
  });
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=48.82&lon=9.06&appid=c57be652764d5d8e7fb9056d1d712348&units=metric&lang=de",
    {
      method: "GET",
      agent: agent,
    }
  );

  let weather = await res.text();
  if (res.status == 200) {
    let weatherJson = JSON.parse(weather);
    let valueTemp = parseFloat(weatherJson["main"]["temp"]);
    let maxTemp = parseFloat(weatherJson["main"]["temp_max"]);
    let minTemp = parseFloat(weatherJson["main"]["temp_min"]);
    let roundedMinTemp = Math.round(minTemp * 10) / 10;
    let roundedValueTemp = Math.round(valueTemp * 10) / 10;
    let roundedMaxTemp = Math.round(maxTemp * 10) / 10;
    let newJson = {
      weatherText: weatherJson["weather"]["0"]["description"],
      weatherIcon:
        "http://openweathermap.org/img/wn/" +
        weatherJson["weather"]["0"]["icon"] +
        "@2x.png",
      temperature: {
        value: roundedValueTemp,
        min: roundedMinTemp,
        max: roundedMaxTemp,
      },
      wind: {
        degrees: weatherJson["wind"]["deg"],
        speed: weatherJson["wind"]["speed"],
      },
    };
    return new Response(JSON.stringify(newJson), {
      status: 200,
      statusText: "Returned weather information",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }
  return new Response("", {
    status: 401,
    statusText: "Invalid weather data",
  });
}
