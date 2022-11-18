import { redirect } from "@sveltejs/kit";

// @ts-ignore
export const load = ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
};
