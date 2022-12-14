import { fail, redirect } from "@sveltejs/kit";
import { storeUser } from "$lib/stores/user";

// @ts-ignore
export async function load({ locals, params }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  } else {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
    const record = await locals.pb.collection("requests").getOne(params.id);
    if (record.finished) {
      throw redirect(303, "/");
    }
    return { user: authStoreModel };
  }
}
export const actions = {
  "post-reply": async ({ request, locals, url, params }) => {
    const formData = await request.formData();
    let body = Object.fromEntries(formData.entries());
    if (url.searchParams.has("user")) {
      if (body.text && body.check) {
        var user = url.searchParams.get("user");
        var inputFiles = formData.getAll("file");
        let userdata;
        let unsubscribe = storeUser.subscribe((val) => (userdata = val));
        try {
          const requestFormData = new FormData();
          requestFormData.append("author", user || "");
          requestFormData.append("request", params.id);
          requestFormData.append(
            "text",
            // @ts-ignore
            body.text.replaceAll("\n", "<br />")
          );
          for (let inputFile of inputFiles.filter(function (e) {
            return e.size > 0;
          })) {
            requestFormData.append("files", inputFile);
          }

          // @ts-ignore
          await locals.pb.collection("answers").create(requestFormData);
          let points = userdata.points + 25;
          storeUser.set(points);
          var updateUser = {
            points: points,
          };
          await locals.pb
            .collection("users")
            .update(locals.pb.authStore.model.id, updateUser);
        } catch (err) {
          console.log(err);
          return fail(400, {
            errorMessage: "Eintrag konnte nicht erstellt werden.",
            body: JSON.parse(JSON.stringify(body)),
          });
        } finally {
          unsubscribe();
        }
        throw redirect(303, "/ticket/" + params.id + "?modal=reply");
      } else {
        if (body.text == "") {
          return fail(400, {
            missingText: true,
            errorMessage: "Bitte gebe dein Antworttext an",
            body: JSON.parse(JSON.stringify(body)),
          });
        } else {
          return fail(400, {
            missingCheck: true,
            errorMessage:
              "Leider kannst du keine Antwort schreiben, wenn du nicht damit einverstanden bist haftbar gemacht zu werden.",
            body: JSON.parse(JSON.stringify(body)),
          });
        }
      }
    } else {
      throw redirect(303, "/");
    }
  },
};
