<script>
import { storeUser } from "$lib/stores/user.js";
import { tickets } from "$lib/stores/tickets.js";

var modal = false;
var errorText = false;
var errorCheck = false;
var errorMessage = "";
</script>

<div
  class="absolute flex h-max w-full content-center items-center justify-center">
  <div class="card my-5 w-2/3 bg-base-300 shadow-xl">
    <div class="card-title mx-5 mt-5">
      <h1 class="text-3xl font-bold">Antwort:</h1>
    </div>
    <div class="card-body">
      <label for="user" class="text-left">Angemeldet als</label>
      <input
        type="text"
        name="user"
        placeholder="{$storeUser.username}"
        class="input-bordered input max-w-md text-white"
        disabled />
      <div class="divider"></div>
      <form
        method="post"
        on:submit="{() => (modal = true)}"
        enctype="multipart/form-data"
        action="?/post-ticket&user={$storeUser.id}">
        <div class="form-control mt-5 grid gap-y-5">
          <textarea
            class="textarea-bordered textarea {errorText
              ? 'input-error'
              : 'textarea-primary'} "
            on:click="{() => (errorText = false)}"
            name="text"
            placeholder="Antwort"></textarea>
          <label for="file">Zusätzliche Dateien (max. 10)</label>
          <input
            type="file"
            name="file"
            id="file"
            class="file-input-bordered file-input-primary file-input max-w-md"
            multiple />
          <label class="label cursor-pointer">
            <div class="flex flex-col">
              <span class="label-text text-lg"
                >Ich habe verstanden, dass ich für diese Antwort voll haftbar
                gemacht werden kann.</span>
              <p class="label inline-block text-sm">
                (nach <a
                  href="https://rebrand.ly/-00A7_241_Abs_1_BGB"
                  class=" underline">§241 Abs. 1 BGB</a
                >,
                <a href="https://rebrand.ly/-00A7_276_BGB" class="underline"
                  >§276</a
                >,
                <a href="https://rebrand.ly/-00A7_459_BGB" class="underline"
                  >§459 BGB</a
                >)
                <!-- rick roll, amazon bgb, lmgtfy -->
              </p>
            </div>
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
            <button class="btn-primary btn items-center"
              ><i class="fa-solid fa-paper-plane mr-4"></i> Absenden</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
