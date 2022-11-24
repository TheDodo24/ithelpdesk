import { error, redirect } from "@sveltejs/kit";

// @ts-ignore
export async function load({ locals, params, url }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  } else {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
    try {
      const record = await locals.pb.collection("requests").getOne(params.id, {
        expand: "author",
      });
      const recordJson = JSON.parse(JSON.stringify(record));
      const dateOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        minute: "2-digit",
        hour: "2-digit",
      };
      const createdDate = new Date(recordJson.created);
      recordJson["created"] = createdDate.toLocaleDateString(
        "de-de",
        dateOptions
      );
      const files = recordJson["files"];
      for (let file of files) {
        const url = locals.pb.getFileUrl(record, file);
        files[files.indexOf(file)] = url;
      }
      recordJson["files"] = files;

      const answers = await locals.pb.collection("answers").getFullList(200, {
        sort: "created",
        expand: "author",
        filter: "request = '" + recordJson.id + "'",
      });

      var answerJson = JSON.parse(JSON.stringify(answers));

      for (let answer of answerJson) {
        const createdDate = new Date(answer.created);
        answer["created"] = createdDate.toLocaleDateString(
          "de-de",
          dateOptions
        );
      }
      var modal = undefined;

      if (url.searchParams.has("modal")) {
        modal = url.searchParams.get("modal");
      }

      return {
        record: recordJson,
        user: authStoreModel,
        answers: answerJson,
        modal: modal,
      };
    } catch (err) {
      console.log(err);
      throw error(404, "Request with id " + params.id + " not found");
    }
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ locals, params }) => {
    const id = params.id;

    const data = {
      finished: true,
    };
    await locals.pb.collection("requests").update(id, data);
    throw redirect(303, "?modal=closed");
  },
};
