import { error, redirect } from "@sveltejs/kit";

// @ts-ignore
export async function load({ locals, params }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  } else {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
    try {
      const record = await locals.pb.collection("requests").getOne(params.id, {
        expand: "author",
      });
      return {
        record: JSON.parse(JSON.stringify(record)),
        user: authStoreModel,
      };
    } catch (err) {
      throw error(404, "Request with id " + params.id + " not found");
    }
  }
}
