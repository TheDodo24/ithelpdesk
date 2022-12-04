import PocketBase from "pocketbase";
// @ts-ignore
export const handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase("https://it.envys.de/");
  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  const response = await resolve(event);
  response.headers.set(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({ secure: false })
  );
  return response;
};
