<script>
// @ts-nocheck

import { quintOut } from "svelte/easing";
import { scale } from "svelte/transition";

/** @type {import('./$types').ActionData} */ export let form;

var errorMessage = form?.errorMessage || "";
var errorMail = form?.incorrectLogin || form?.missingMail;
var errorPassword =
  form?.incorrectLogin || form?.missingPassword || form?.notTheSamePassword;
var errorCheckPassword = form?.missingPasswordCheck || form?.notTheSamePassword;
var errorName = form?.missingName;
var checkError = form?.missingCheck;
var op = form?.register;
var modal = false;
</script>

<div class="flex h-screen w-screen content-center items-center justify-center">
  <div class="card w-96 bg-base-300 shadow-xl">
    <div class="card-body items-center">
      <div class="btn-group">
        <button
          class="btn {!op
            ? 'bg-purple-800'
            : ''} text-white hover:bg-purple-900"
          on:click="{() => (op = false)}">Anmelden</button>
        <button
          class="btn {op ? 'bg-purple-800' : ''} text-white hover:bg-purple-900"
          on:click="{() => (op = true)}">Registrieren</button>
      </div>
      <form
        method="post"
        action="{!op ? '?/login' : '?/register'}"
        on:submit="{() => (modal = true)}">
        <div class="form-control mt-5 grid w-full gap-y-5">
          <input
            type="{!op ? 'text' : 'email'}"
            name="email"
            placeholder="{!op ? 'E-Mail/Benutzername' : 'E-Mail'}"
            on:click="{() => (errorMail = false)}"
            class="input input-bordered {errorMail
              ? 'input-error'
              : 'input-primary'} w-full" />
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            on:click="{() => (errorPassword = false)}"
            class="input input-bordered {errorPassword
              ? 'input-error'
              : 'input-primary'} w-full" />
          {#if op}
            <input
              type="password"
              name="checkPassword"
              transition:scale="{{
                duration: 500,
                delay: 0,
                opacity: 0.2,
                start: 0.1,
                easing: quintOut,
              }}"
              placeholder="Passwort wiederholen"
              on:click="{() => (errorCheckPassword = false)}"
              class="input input-bordered {errorCheckPassword
                ? 'input-error'
                : 'input-primary'} w-full" />
            <input
              type="text"
              name="name"
              transition:scale="{{
                duration: 500,
                delay: 0,
                opacity: 0.2,
                start: 0.1,
                easing: quintOut,
              }}"
              on:click="{() => (errorName = false)}"
              placeholder="Benutzername"
              class="input input-bordered {errorName
                ? 'input-error'
                : 'input-primary'} w-full" />
            <label
              transition:scale="{{
                duration: 500,
                delay: 0,
                opacity: 0.2,
                start: 0.1,
                easing: quintOut,
              }}"
              class="label cursor-pointer">
              <span class="label-text">Ich verkaufe meine Seele</span>
              <input
                type="checkbox"
                name="check"
                on:click="{() => (checkError = false)}"
                class="checkbox {checkError
                  ? 'checkbox-error'
                  : 'checkbox-primary'}" />
            </label>
          {/if}
          <div class="divider"></div>
          {#if errorMessage != ""}
            <p>{errorMessage}</p>
          {/if}
          <button
            class="btn items-center bg-purple-800 text-white hover:bg-purple-900"
            ><i class="fa-solid fa-paper-plane mr-4"></i> Absenden</button>
        </div>
      </form>

      <div class="mt-5 w-full">
        <a class="underline" href="/"
          ><i class="fa-solid fa-arrow-left mr-3"></i>Zurück zur Startseite</a>
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
    <h3 class="py-4 text-lg font-bold">
      {!op ? "Anmeldung" : "Registrierung"} wird ausgeführt...
    </h3>
    <p class="">Bitte warte einen Augenblick.</p>
  </div>
</div>
