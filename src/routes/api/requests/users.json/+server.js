export async function GET({ locals }) {
  const records = await locals.pb.collection("users").getFullList(200, {
    sort: "-points,username",
  });
  let recordsJson = [];
  for (const record of JSON.parse(JSON.stringify(records))) {
    if (record.verified) {
      recordsJson.push({
        username: record["username"],
        points: record.points,
      });
    }
  }
  return new Response(JSON.stringify(recordsJson), {
    status: 200,
    statusText: "",
  });
}
