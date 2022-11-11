import quotes from "$lib/zitate.json" assert { type: "json" };

export async function GET() {
  let random = Math.floor(Math.random() * quotes.length);
  let json = quotes.at(random);
  return new Response(JSON.stringify(json), {
    status: 200,
    statusText: "Returned Marx quote",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}
