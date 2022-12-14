import { fail, redirect } from "@sveltejs/kit";
import { storeUser } from "$lib/stores/user";

// @ts-ignore
export async function load({ locals, params }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  } else {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
    return { user: authStoreModel };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  "post-ticket": async ({ request, locals, url }) => {
    const formData = await request.formData();
    let body = Object.fromEntries(formData.entries());
    let userdata;
    const unsubscribe = storeUser.subscribe((val) => (userdata = val));
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

          let points = userdata.points + 100;
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
        throw redirect(303, "/anfragen?modal=created");
      } else {
        if (body.title == "") {
          return fail(400, {
            missingTitle: true,
            errorMessage: "Bitte gebe einen Titel an",
            body: JSON.parse(JSON.stringify(body)),
          });
        } else if (body.text == "") {
          return fail(400, {
            missingText: true,
            errorMessage: "Bitte gebe dein Problem an",
            body: JSON.parse(JSON.stringify(body)),
          });
        } else {
          return fail(400, {
            missingCheck: true,
            errorMessage:
              "Leider kannst du kein Ticket erstellen, wenn du nicht verspottet werden möchtest.",
            body: JSON.parse(JSON.stringify(body)),
          });
        }
      }
    } else {
      throw redirect(303, "/");
    }
  },
};
