import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
  locals.pb.authStore.clear();

  throw redirect(302, "/?modal=logout&name=" + url.searchParams.get("name"));
}
