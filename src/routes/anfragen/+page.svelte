<script>
import { storeUser } from "$lib/stores/user.js";
import Header from "$lib/Header_test.svelte";
import RequestList from "./RequestList.svelte";
import { onMount } from "svelte";

/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}
var modal = data.modal;

onMount(() => {
  const requestList = new RequestList({
    target: document.querySelector("div#list"),
    intro: true,
  });
});
</script>

<div class="static w-screen">
  <div class="absolute mx-5 mb-5">
    <Header user="{$storeUser ? $storeUser['username'] : undefined}" />
    <div id="list"></div>
  </div>
</div>

{#if modal}
  <div class="modal {modal ? 'modal-open' : ''}">
    <div class="modal-box relative items-center text-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/anfragen"
        ><label
          for="my-modal-3"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          on:click="{() => {
            modal = false;
          }}">✕</label
        ></a>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2">
        <circle
          class="path circle"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"></circle>
        <polyline
          class="path check"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "></polyline>
      </svg>
      <h3 class="py-4 text-lg font-bold">
        {modal == "post"
          ? "Antwort wurde erfolgreich gepostet"
          : "Dein Ticket wurde erfolgreich erstellt"}
      </h3>
      <p class="">
        {modal == "post"
          ? "Deine Antwort wurde gepostet."
          : "Dein Ticket wurde erfolgreich erstellt und wird sobald wie möglich bearbeitet."}
      </p>
    </div>
  </div>
{/if}
