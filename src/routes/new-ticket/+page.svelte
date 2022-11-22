<script>
import { storeUser } from "../stores/user.js";
/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}

/** @type {import('./$types').ActionData} */ export let form;

var errorMessage = form?.errorMessage;
var errorTitle = form?.missingTitle;
var errorText = form?.missingText;
var errorCheck = form?.missingCheck;
</script>

<div
  class="absolute flex h-max w-full content-center items-center justify-center">
  <div class="card my-5 w-2/3 bg-base-300 shadow-xl">
    <div class="card-title mx-5 mt-5">
      <h1 class="text-3xl font-bold">Neue Anfrage</h1>
    </div>
    <div class="card-body">
      <label for="user" class="text-left">Angemeldet als</label>
      <input
        type="text"
        name="user"
        placeholder="{$storeUser.username}"
        class="input input-bordered max-w-md text-white"
        disabled />
      <div class="divider"></div>
      <form method="post" action="?/post-ticket&user={$storeUser.id}">
        <div class="form-control mt-5 grid gap-y-5">
          <input
            type="text"
            placeholder="Titel"
            name="title"
            class="input input-bordered {errorTitle
              ? 'input-error'
              : 'input-primary'} "
            on:click="{() => (errorTitle = false)}" />
          <textarea
            class="textarea textarea-bordered {errorText
              ? 'input-error'
              : 'textarea-primary'} "
            on:click="{() => (errorText = false)}"
            name="text"
            placeholder="Beschreibe dein Problem"></textarea>
          <label for="file">Zusätzliche Dateien</label>
          <input
            type="file"
            id="file"
            name="files"
            class="file-input file-input-bordered file-input-primary max-w-md"
            multiple />
          <label class="label cursor-pointer">
            <span class="label-text text-lg"
              >Ich erkläre mich damit einverstanden, für dieses Ticket
              verspottet zu werden</span>
            <input
              type="checkbox"
              name="check"
              class="checkbox {errorCheck
                ? 'checkbox-error'
                : 'checkbox-primary'}"
              on:click="{() => (errorCheck = false)}" />
          </label>
        </div>
        <div class="divider"></div>
        <p class="text-center text-2xl text-error">
          {errorMessage ? errorMessage : ""}
        </p>
        <div class="relative flex flex-row justify-between">
          <div class="mt-5">
            <a class="underline" href="/anfragen"
              ><i class="fa-solid fa-arrow-left mr-3"></i>Zurück zur Anfragen
              Übersicht</a>
          </div>
          <div class="mr-5">
            <button class="btn btn-primary items-center"
              ><i class="fa-solid fa-paper-plane mr-4"></i> Absenden</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
