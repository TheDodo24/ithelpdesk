/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
  var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
  console.log("authstore: " + authStoreModel);
  if (url.searchParams.has("modal") && authStoreModel) {
    return {
      op: url.searchParams.get("modal"),
      user: authStoreModel,
    };
  } else if (url.searchParams.has("modal")) {
    if (url.searchParams.has("name")) {
      return {
        op: url.searchParams.get("modal"),
        name: url.searchParams.get("name"),
        user: undefined,
      };
    }
    return {
      op: url.searchParams.get("modal"),
      user: undefined,
    };
  }
  if (authStoreModel) {
    return {
      op: undefined,
      user: authStoreModel,
    };
  }
  return {
    op: undefined,
    user: undefined,
  };
}
