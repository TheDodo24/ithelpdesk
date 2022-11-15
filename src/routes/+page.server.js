/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const sessionid = cookies.get("sessionid");
  const loggedin = cookies.get("loggedin");
  const registered = cookies.get("registered");
  const user = {
    name: sessionid,
    sessionid: sessionid,
    operation: "",
  };
  if (loggedin) {
    user["operation"] = "login";
    cookies.delete("loggedin");
  } else if (registered) {
    user["operation"] = "register";
    cookies.delete("registered");
  }
  return { user };
}
