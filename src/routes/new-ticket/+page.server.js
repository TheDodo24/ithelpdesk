import { invalid, redirect } from "@sveltejs/kit";
import papa from "papaparse";

// @ts-ignore
export async function load({ locals }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  } else {
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

/** @type {import('./$types').Actions} */
export const actions = {
  "post-ticket": async ({ request, locals, url }) => {
    const formData = await request.formData();
    let body = Object.fromEntries(formData.entries());
    if (url.searchParams.has("user")) {
      if (body.title && body.text && body.check) {
        var user = url.searchParams.get("user");
        var inputFiles = formData.getAll("file");
        try {
          const requestFormData = new FormData();
          requestFormData.append("author", user || "");
          requestFormData.append(
            "content",
            // @ts-ignore
            body.text.replaceAll("\n", "<br />")
          );
          requestFormData.append("title", body.title);
          requestFormData.append("finished", "false");
          for (let inputFile of inputFiles) {
            requestFormData.append("files", inputFile);
          }
          // @ts-ignore
          await locals.pb.collection("requests").create(requestFormData);
        } catch (err) {
          return invalid(400, {
            errorMessage: "Eintrag konnte nicht erstellt werden.",
          });
        }
        throw redirect(303, "/anfragen?modal=created");
      } else {
        if (body.title == "") {
          return invalid(400, {
            missingTitle: true,
            errorMessage: "Bitte gebe einen Titel an",
          });
        } else if (body.text == "") {
          return invalid(400, {
            missingText: true,
            errorMessage: "Bitte gebe dein Problem an",
          });
        } else {
          return invalid(400, {
            missingCheck: true,
            errorMessage:
              "Leider kannst du kein Ticket erstellen, wenn du nicht verspottet werden möchtest.",
          });
        }
      }
    } else {
      throw redirect(303, "/");
    }
  },
};
