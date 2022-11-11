export async function GET() {
  const res = await fetch("https://aramarkio.vercel.app/api/menu/menu.json", {
    method: "GET",
  });

  let json = JSON.parse(await res.text());
  let menus = json.filter(function filter(
    /** @type {{ [x: string]: any; }} */ item
  ) {
    return item["day"] == 0;
  });

  return new Response(JSON.stringify(menus), {
    status: 200,
    statusText: "Returned aramark menu for today",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}
