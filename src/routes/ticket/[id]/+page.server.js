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
    await locals.pb.collection("requests").update(id, data);
    throw redirect(303, "?modal=closed");
  },
};
