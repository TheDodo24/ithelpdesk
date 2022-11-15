<script>
// @ts-nocheck

import { quintOut } from "svelte/easing";
import { scale } from "svelte/transition";

/** @type {import('./$types').ActionData} */ export let form;

var errorMessage = form?.errorMessage || "";
var errorName = form?.incorrectLogin || form?.missingName;
var errorPassword =
  form?.incorrectLogin || form?.missingPassword || form?.notTheSamePassword;
var errorCheckPassword = form?.missingPasswordCheck || form?.notTheSamePassword;
var checkError = form?.missingCheck;
var op = form?.register;
console.log(op);
</script>

<div class="flex h-screen w-screen content-center items-center justify-center">
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body items-center">
      <div class="btn-group">
        <button
          class="btn {!op ? 'btn-active' : ''}"
          on:click="{() => (op = false)}">Anmelden</button>
        <button
          class="btn {op ? 'btn-active' : ''}"
          on:click="{() => (op = true)}">Registrieren</button>
      </div>
      <form method="post" action="{!op ? '?/login' : '?/register'}">
        <div class="form-control mt-5 grid w-full gap-y-5">
          <input
            type="text"
            name="name"
            placeholder="Nutzername"
            on:click="{() => (errorName = false)}"
            class="input input-bordered {errorName
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
          <button class="btn btn-outline btn-primary items-center"
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
