/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
  var authStoreModel = JSON.parse(JSON.stringify(locals.pb.authStore.model));
  console.log("authstore: " + authStoreModel);
  if (url.searchParams.has("modal") && authStoreModel) {
    return {
      op: url.searchParams.get("modal"),
      user: authStoreModel,
      tickets: await getTickets(locals),
    };
  } else if (url.searchParams.has("modal")) {
    if (url.searchParams.has("name")) {
      return {
        op: url.searchParams.get("modal"),
        name: url.searchParams.get("name"),
        user: undefined,
        tickets: undefined,
      };
    }
    return {
      op: url.searchParams.get("modal"),
      user: undefined,
      tickets: undefined,
    };
  }
  if (authStoreModel) {
    return {
      op: undefined,
      user: authStoreModel,
      tickets: await getTickets(locals),
    };
  }
  return {
    op: undefined,
    user: undefined,
    tickets: undefined,
  };
}

async function getTickets(locals) {
  const records = await locals.pb.collection("requests").getFullList(200, {
    sort: "finished,created",
  });
  const json = JSON.parse(JSON.stringify(records));
  return Object.keys(json).length <= 0 ? undefined : json;
}
