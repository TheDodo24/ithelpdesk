import { redirect } from "@sveltejs/kit";

// @ts-ignore
export async function load({ locals, url }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  } else {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));

    var modal = undefined;
    if (url.searchParams.has("modal")) {
      modal = url.searchParams.get("modal");
    }
    return { user: authStoreModel, modal: modal };
  }
}
