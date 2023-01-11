<script>
// @ts-nocheck

import { storeUser } from "$lib/stores/user.js";
/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}

/** @type {import('./$types').ActionData} */ export let form;

var errorMessage = form?.errorMessage;
var errorTitle = form?.missingTitle;
var errorText = form?.missingText;
var errorCheck = form?.missingCheck;
var modal = false;
</script>

<div class="absolute w-full">
  <div class="flex h-screen content-center items-center justify-center">
    <div class="card mx-5 my-10 w-fit bg-base-300 shadow-xl">
      <div class="card-title mx-5 mt-5">
        <h1 class="text-3xl font-bold">Neue Anfrage</h1>
      </div>
      <div class="card-body">
        <label for="user" class="hidden text-left md:block"
          >Angemeldet als</label>
        <input
          type="text"
          name="user"
          placeholder="{$storeUser.username}"
          class="input-bordered input hidden max-w-md text-white md:block"
          disabled />
        <div class="divider hidden md:flex"></div>
        <form
          method="post"
          on:submit="{() => (modal = true)}"
          enctype="multipart/form-data"
          action="?/post-ticket&user={$storeUser.id}">
          <div class="form-control mt-5 grid gap-y-5">
            <input
              type="text"
              placeholder="Titel"
              name="title"
              value="{form ? form.body.title : ''}"
              class="input-bordered input {errorTitle
                ? 'input-error'
                : 'input-primary'} "
              on:click="{() => (errorTitle = false)}" />
            <textarea
              class="textarea-bordered textarea {errorText
                ? 'input-error'
                : 'textarea-primary'} "
              on:click="{() => (errorText = false)}"
              name="text"
              value="{form ? form.body.text : ''}"
              placeholder="Beschreibe dein Problem"></textarea>
            <label for="file">Zusätzliche Dateien (max. 10)</label>
            <input
              type="file"
              name="file"
              id="file"
              class="file-input-bordered file-input-primary file-input max-w-md"
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
          <div class="relative flex flex-col justify-between md:flex-row">
            <div class="mt-5">
              <a class="underline" href="/anfragen"
                ><i class="fa-solid fa-arrow-left mr-3"></i>Zurück zur Anfragen
                Übersicht</a>
            </div>
            <div class="mr-5">
              <button class="btn btn-primary mt-5 items-center md:mt-0"
                ><i class="fa-solid fa-paper-plane mr-4"></i> Absenden</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal {modal ? 'modal-open' : ''}">
    <div class="modal-box relative items-center text-center">
      <svg class="h-25 w-25 animate-spin" viewBox="0 0 24 24">
        <circle
          class="opacity-0"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          data-darkreader-inline-stroke=""
          style="--darkreader-inline-stroke:white;"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          data-darkreader-inline-fill=""
          style="--darkreader-inline-fill:currentColor;"></path
        ></svg>
      <h3 class="py-4 text-lg font-bold">Dein Ticket wird erstellt...</h3>
      <p class="">Bitte warte einen Augenblick.</p>
    </div>
  </div>
</div>
