import { error, redirect } from "@sveltejs/kit";

// @ts-ignore
export async function load({ locals, params, url }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  } else {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
    var modal = undefined;

    if (url.searchParams.has("modal")) {
      modal = url.searchParams.get("modal");
    }

    try {
      await locals.pb.collection("requests").getOne(params.id);
    } catch (err) {
      throw error(500, "No ticket with id " + params.id + " found.");
    }

    return {
      user: authStoreModel,
      modal: modal,
      id: params.id,
    };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ locals, params }) => {
    const id = params.id;

    const data = {
      finished: true,
    };
    const record = await locals.pb.collection("requests").update(id, data);
    const user = await locals.pb.collection("users").getOne(record.author);
    const userData = {
      points: user.points + 75,
    };
    await locals.pb.collection("users").update(user.id, userData);
    throw redirect(303, "?modal=close");
  },
};
