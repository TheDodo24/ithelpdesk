<script>
import { tickets } from "$lib/stores/tickets.js";
import { error } from "@sveltejs/kit";
import Box from "$lib/Box.svelte";
import { goto } from "$app/navigation";
import { Shadow } from "svelte-loading-spinners";

export let id;
export let modal;

let promise;
if (!$tickets || Object.keys($tickets).length == 0) {
  promise = requestJson(id);
}

async function requestJson(id) {
  const req = await fetch("http://localhost:5173/api/requests/list.json");
  let response = await req.text();
  let json = JSON.parse(response);
  $tickets = json;
  if (req.ok && json[id]) return json;
  else throw error(500, "No ticket " + id + " found.");
}

var closeModal = false;
</script>

{#if !$tickets || Object.keys($tickets).length == 0}
  {#await promise}
    <div class="flex items-center justify-center content-center mt-32">
      <Shadow size="60" color="#7E22CE" unit="px" duration="2.5s" />
    </div>
  {/await}
{:else}
  <div class="my-5 flex flex-col">
    <div class="ml-10 flex flex-col">
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/"
              ><i class="fa-solid fa-house-chimney mr-2"></i>Startseite</a>
          </li>
          <li>
            <a href="/anfragen"
              ><i class="fa-solid fa-bars-staggered mr-2"></i>Anfragen</a>
          </li>
          <li>
            <i class="fa-solid fa-circle-question mr-2"></i>{$tickets[id].title}
          </li>
        </ul>
      </div>
      <div class="text-sm underline">
        <a href="/anfragen"
          ><i class="fa-solid fa-arrow-left"></i> Zurück zur Anfragenübersicht</a>
      </div>
      <div class="flex flex-row justify-between text-6xl font-bold">
        <div>{$tickets[id].title}</div>
        {#if !$tickets[id].finished}
          <div class="mr-10">
            <button
              class="btn mx-8 hidden bg-green-500 text-white hover:bg-green-600 md:inline"
              on:click="{() => (closeModal = true)}">
              <i class="fa-solid fa-check mr-2"></i> Ticket schließen</button>
            <button
              on:click="{() => goto(id + '/reply')}"
              class="btn hidden bg-purple-500 text-white hover:bg-purple-600 md:inline"
              >+ Antworten</button>
          </div>
        {/if}
      </div>
      <div class="text-lg">Erstellt: {$tickets[id].created}</div>
      <div class="mt-5 flex flex-col justify-start gap-y-2 md:hidden">
        <button
          class="btn w-60 bg-green-500 text-white hover:bg-green-600"
          on:click="{() => (closeModal = true)}">
          <i class="fa-solid fa-check mr-2"></i> Ticket schließen</button>
        <button
          on:click="{() => goto(id + '/reply')}"
          class="btn w-60 bg-purple-500 text-white hover:bg-purple-600"
          >+ Antworten</button>
      </div>
      {#if $tickets[id].finished}
        <div class="text-lg text-green-500">
          <i class="fa-solid fa-check mr-1"></i> Ticket abgeschlossen
        </div>
      {/if}
    </div>
    <div class="divider"></div>
    <div class="mx-5  text-white">
      <Box margin="{false}" clazz="bg-purple-800">
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold">
            {$tickets[id].expand.author.username}
            <i class="fa-solid mx-1 fa-{$tickets[id].icon}"></i>- {$tickets[id]
              .created}
          </h2>
          <p class="mt-2">{@html $tickets[id].content}</p>
          {#if $tickets[id].files.length > 0}
            <div class="divider"></div>
            <div class="text-2xl font-bold">Dateien:</div>
            <div class="mt-2 grid gap-5 md:grid-cols-3 lg:grid-cols-4">
              {#each $tickets[id].files as file}
                <a class="inline-block" href="{file}"
                  ><i class="fa-solid fa-file mr-2"></i>{file.split("/")[
                    file.split("/").length - 1
                  ]}</a>
              {/each}
            </div>
          {/if}
        </div>
      </Box>
      {#each $tickets[id].answers as answer}
        <Box margin="{false}" clazz="bg-purple-800 mt-5">
          <div class="flex flex-col">
            <h2 class="text-2xl font-bold">
              {answer.expand.author.username}
              <i class="fa-solid mx-1 fa-{answer.icon}"></i>- {answer.created}
            </h2>
            <p class="mt-2">{@html answer.text}</p>
            {#if answer.files.length > 0}
              <div class="divider"></div>
              <div class="text-2xl font-bold">Dateien:</div>
              <div class="mt-2 grid gap-5 md:grid-cols-3 lg:grid-cols-4">
                {#each answer.files as file}
                  <a class="inline-block" href="{file}"
                    ><i class="fa-solid fa-file mr-2"></i>{file.split("/")[
                      file.split("/").length - 1
                    ]}</a>
                {/each}
              </div>
            {/if}
          </div>
        </Box>
      {/each}
    </div>
  </div>
  {#if modal}
    <div class="modal {modal == 'reply' ? 'modal-open' : ''}">
      <div class="modal-box relative items-center text-center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a href="?"
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
          Antwort wurde erfolgreich gepostet
        </h3>
        <p class="">Deine Antwort wurde gepostet.</p>
      </div>
    </div>
    <div class="modal {modal == 'close' ? 'modal-open' : ''}">
      <div class="modal-box relative items-center text-center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a href="?"
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
        <h3 class="py-4 text-lg font-bold">Ticket geschlossen</h3>
        <p class="">Dein Ticket wurde erfolgreich geschlossen</p>
      </div>
    </div>
  {/if}
{/if}

{#if closeModal}
  <div class="modal modal-open">
    <div class="modal-box relative items-center text-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <i class="fa-solid fa-question text-9xl"></i>
      <h3 class="py-4 text-lg font-bold">
        Bist du dir sicher, dass du das Ticket schließen möchtest?
      </h3>
      <div class="modal-action">
        <button
          class="btn bg-red-600 text-white hover:bg-red-700"
          on:click="{() => (closeModal = false)}"
          ><i class="fa-solid fa-x mr-2"></i> Abbrechen</button>
        <form method="post">
          <button
            for="my-modal"
            class="btn bg-green-600 text-white hover:bg-green-700"
            ><i class="fa-solid fa-check mr-2"></i> Schließen</button>
        </form>
      </div>
    </div>
  </div>
{/if}
