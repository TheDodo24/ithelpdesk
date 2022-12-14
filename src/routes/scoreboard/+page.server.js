// @ts-ignore
export async function load({ locals }) {
  if (locals.pb.authStore.isValid) {
    var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));

    return { user: authStoreModel };
  }
}
