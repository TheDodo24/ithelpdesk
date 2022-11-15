import { invalid, redirect } from "@sveltejs/kit";
import { user } from "../stores/user.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const sessionid = cookies.get("sessionid");
  const user = {
    name: sessionid,
    sessionid: sessionid,
  };
  return { user };
}

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");

    if (name != "" && password != "") {
      if (name == "Dodo" && password == "abc") {
        var stringName = name?.toString();

        // @ts-ignore
        cookies.set("sessionid", stringName);
        cookies.set("loggedin", "true");

        user.set({ name: stringName, sessionid: stringName });

        throw redirect(303, "/");
      } else {
        return invalid(400, {
          name,
          incorrectLogin: true,
          errorMessage:
            "Die Kombination aus Benutzername und Passwort ist ungültig.",
          register: false,
        });
      }
    } else {
      if (name == "") {
        return invalid(400, {
          name,
          missingName: true,
          errorMessage: "Bitte gib einen Namen an.",
          register: false,
        });
      } else {
        return invalid(400, {
          name,
          missingPassword: true,
          errorMessage: "Bitte gib ein Passwort an.",
          register: false,
        });
      }
    }
  },
  register: async ({ cookies, request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");
    const checkPassword = data.get("checkPassword");
    const check = data.get("check");

    if (name != "" && password != "" && checkPassword != "" && check) {
      if (password == checkPassword) {
        var stringName = name?.toString();
        // @ts-ignore
        cookies.set("sessionid", stringName);
        cookies.set("registered", "true");
        user.set({ name: stringName, sessionid: stringName });
        throw redirect(303, "/");
      } else {
        return invalid(400, {
          name,
          notTheSamePassword: true,
          errorMessage: "Die Passwörter stimmen nicht überein.",
          register: true,
        });
      }
    } else {
      if (name == "") {
        return invalid(400, {
          name,
          missingName: true,
          errorMessage: "Bitte gib einen Namen an.",
          register: true,
        });
      } else if (password == "") {
        return invalid(400, {
          name,
          missingPassword: true,
          errorMessage: "Bitte gib ein Passwort an.",
          register: true,
        });
      } else if (checkPassword == "") {
        return invalid(400, {
          name,
          missingPasswordCheck: true,
          errorMessage: "Bitte gib das Passwort zwei mal an.",
          register: true,
        });
      } else {
        return invalid(400, {
          name,
          missingCheck: true,
          errorMessage: "Du musst diene Seele verkaufen.",
          register: true,
        });
      }
    }
  },
};
