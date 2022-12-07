<script>
// @ts-nocheck

/** @type {import('./$types').ActionData} */ export let form;

var errorMessage = form?.errorMessage || "";
var errorMail = form?.missingMail;
var modal = false;
</script>

<div class="flex h-screen w-screen content-center items-center justify-center">
  <div class="card w-fit bg-base-300 shadow-xl">
    <div class="card-body items-center">
      <h1 class="text-2xl font-bold">Passwort zurücksetzen</h1>
      <form
        method="post"
        class="w-full px-5"
        action="?/reset"
        on:submit="{() => (modal = true)}">
        <div class="form-control mt-5 grid w-full gap-y-5">
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            on:click="{() => (errorMail = false)}"
            class="input-bordered input {errorMail
              ? 'input-error'
              : 'input-primary'} w-full" />
          <div class="divider"></div>
          {#if errorMessage != ""}
            <p class="text-center">{@html errorMessage}</p>
          {/if}
          <button
            class="btn items-center bg-purple-800 text-white hover:bg-purple-900"
            ><i class="fa-solid fa-paper-plane mr-4"></i> Absenden</button>
        </div>
      </form>

      <div class="mx-10 mt-5 w-full">
        <a class="underline" href="/signin"
          ><i class="fa-solid fa-arrow-left mr-3"></i>Zurück zum
          Anmeldenformular</a>
      </div>
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
    <h3 class="py-4 text-lg font-bold">Anfrage wird gesendet...</h3>
    <p class="">Bitte warte einen Augenblick.</p>
  </div>
</div>
