import { redirect, fail } from "@sveltejs/kit";

export async function load({ locals }) {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
}

export const actions = {
  reset: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData());
    if (body.email) {
      await locals.pb.collection("users").requestPasswordReset(body.email);
      throw redirect(303, "/?modal=reset");
    } else {
      return fail(400, {
        errorMessage: "Bitte gebe eine E-Mail an",
        missingMail: true,
      });
    }
  },
};
