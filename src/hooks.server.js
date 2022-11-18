import PocketBase from "pocketbase";
// @ts-ignore
export const handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase("http://127.0.0.1:8090");
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
