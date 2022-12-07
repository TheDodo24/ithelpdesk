import { invalid, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    if (body.email && body.password) {
      try {
        const authData = await locals.pb
          .collection("users")
          .authWithPassword(body.email, body.password);
        if (!authData.record.verified) {
          locals.pb.authStore.clear();
          return invalid(400, {
            incorrectLogin: true,
            errorMessage:
              "Du musst zuerst deine E-Mail verifizieren, bevor du dich anmelden kannst.",
          });
        }
      } catch (err) {
        return invalid(400, {
          incorrectLogin: true,
          errorMessage:
            "Die Kombination aus Passwort und E-Mail existiert nicht.",
        });
      }
      // @ts-ignore
      throw redirect(303, "/?modal=login");
    } else {
      if (body.email == "") {
        return invalid(400, {
          missingMail: true,
          errorMessage: "Bitte gib eine E-Mail an.",
          register: false,
        });
      } else {
        return invalid(400, {
          missingPassword: true,
          errorMessage: "Bitte gib ein Passwort an.",
          register: false,
        });
      }
    }
  },
  register: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData());

    if (
      body.email != "" &&
      body.password != "" &&
      body.checkPassword != "" &&
      body.check &&
      body.name != ""
    ) {
      if (body.password == body.checkPassword) {
        if (body.password.toString().length >= 8) {
          const data = {
            username: body.name,
            email: body.email,
            emailVisibility: true,
            password: body.password,
            passwordConfirm: body.password,
            points: 100,
          };
          var result;
          try {
            result = await locals.pb.collection("users").create(data);
            await locals.pb.collection("users").requestVerification(body.email);
          } catch (err) {
            return invalid(400, {
              errorMessage:
                "Konnte nicht registriert werden:<br />" +
                err.data.data[Object.keys(err.data.data)[0]].message,
            });
          }

          throw redirect(303, "/?modal=register");
        } else {
          return invalid(400, {
            notTheSamePassword: true,
            errorMessage: "Das Passwort muss mindestens 8 Zeichen lang sein.",
            register: true,
          });
        }
      } else {
        return invalid(400, {
          notTheSamePassword: true,
          errorMessage: "Die Passwörter stimmen nicht überein.",
          register: true,
        });
      }
    } else {
      if (body.email == "") {
        return invalid(400, {
          missingMail: true,
          errorMessage: "Bitte gib eine E-Mail an.",
          register: true,
        });
      } else if (body.password == "") {
        return invalid(400, {
          missingPassword: true,
          errorMessage: "Bitte gib ein Passwort an.",
          register: true,
        });
      } else if (body.checkPassword == "") {
        return invalid(400, {
          missingPasswordCheck: true,
          errorMessage: "Bitte gib das Passwort zwei mal an.",
          register: true,
        });
      } else if (!body.check) {
        return invalid(400, {
          missingCheck: true,
          errorMessage: "Du musst diene Seele verkaufen.",
          register: true,
        });
      } else {
        return invalid(400, {
          missingName: true,
          errorMessage: "Bitte gib einen Namen an.",
          register: true,
        });
      }
    }
  },
};
