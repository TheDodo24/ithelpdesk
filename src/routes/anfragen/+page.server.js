import { redirect } from "@sveltejs/kit";

// @ts-ignore
export async function load({ locals, url }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  } else {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
    const records = await locals.pb.collection("requests").getFullList(200, {
      sort: "finished,created",
    });
    const recordsJson = [];
    for (const record of JSON.parse(JSON.stringify(records))) {
      const user = await locals.pb.collection("users").getOne(record["author"]);
      record["author"] = user["username"];
      const files = record["files"];
      for (let file of files) {
        const url = locals.pb.getFileUrl(record, file);
        files[files.indexOf(file)] = url;
      }
      record["files"] = files;
      let date = new Date(record["created"]);
      record["created"] = date.toLocaleDateString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        minute: "2-digit",
        hour: "2-digit",
      });
      recordsJson.push(record);
    }
    var modal = undefined;
    if (url.searchParams.has("modal")) {
      modal = url.searchParams.get("modal");
    }
    return { user: authStoreModel, records: recordsJson, modal: modal };
  }
}
