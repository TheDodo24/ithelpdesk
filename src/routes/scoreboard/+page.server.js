// @ts-ignore
export async function load({ locals }) {
  if (locals.pb.authStore.isValid) {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
    const records = await locals.pb.collection("requests").getFullList(200);
    const recordsJson = [];
    for (const record of JSON.parse(JSON.stringify(records))) {
      const user = await locals.pb.collection("users").getOne(record["author"]);
      record["author"] = user["username"];
      recordsJson.push(record);
    }
    return { user: authStoreModel, records: recordsJson };
  }
}
