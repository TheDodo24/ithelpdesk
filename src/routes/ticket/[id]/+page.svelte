<script>
import Header from "$lib/Header_test.svelte";
import Box from "$lib/Box.svelte";
import { storeUser } from "../../stores/user.js";
import { goto } from "$app/navigation";
import { Record } from "pocketbase";
/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}
var closeModal = false;
</script>

<div class="absolute w-full">
  <Header user="{$storeUser.username}" />
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
            <i class="fa-solid fa-circle-question mr-2"></i>{data.record.title}
          </li>
        </ul>
      </div>
      <div class="text-sm underline">
        <a href="/anfragen"
          ><i class="fa-solid fa-arrow-left"></i> Zurück zur Anfragenübersicht</a>
      </div>
      <div class="flex flex-row justify-between text-6xl font-bold">
        <div>{data.record.title}</div>
        {#if !data.record.finished}
          <div class="mr-10">
            <button
              class="btn mx-8 bg-green-500 text-white hover:bg-green-600"
              on:click="{() => (closeModal = true)}">
              <i class="fa-solid fa-check mr-2"></i> Ticket schließen</button>
            <button
              on:click="{() => goto(data.record.id + '/reply')}"
              class="btn bg-purple-500 text-white hover:bg-purple-600"
              >+ Antworten</button>
          </div>
        {/if}
      </div>
      <div class="text-lg">Erstellt: {data.record.created}</div>
      {#if data.record.finished}
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
            {data.record.expand.author.username} - {data.record.created}
          </h2>
          <p class="mt-2">{@html data.record.content}</p>
          {#if data.record.files.length > 0}
            <div class="divider"></div>
            <div class="text-2xl font-bold">Dateien:</div>
            <div class="mt-2 grid gap-5 md:grid-cols-3 lg:grid-cols-4">
              {#each data.record.files as file}
                <a class="inline-block" href="{file}"
                  ><i class="fa-solid fa-file mr-2"></i>{file.split("/")[
                    file.split("/").length - 1
                  ]}</a>
              {/each}
            </div>
          {/if}
        </div>
      </Box>
      {#each data.answers as answer}
        <Box margin="{false}" clazz="bg-purple-800 mt-5">
          <div class="flex flex-col">
            <h2 class="text-2xl font-bold">
              {answer.expand.author.username} - {answer.created}
            </h2>
            <p class="mt-2">{@html answer.text}</p>
          </div>
        </Box>
      {/each}
    </div>
  </div>
</div>

{#if closeModal}
  <div class="modal modal-open">
    <div class="modal-box relative items-center text-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <i class="fa-solid fa-question text-9xl"></i>
      <h3 class="py-4 text-lg font-bold">
        Bist du dir sicher, dass du das Ticket schließen möchtest?
      </h3>
      <div class="modal-action">
        <label
          for="my-modal"
          class="btn bg-red-600 text-white hover:bg-red-700"
          on:click="{() => (closeModal = false)}"
          ><i class="fa-solid fa-x mr-2"></i> Abbrechen</label>
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

{#if data.modal}
  <div class="modal modal-open">
    <div class="modal-box relative items-center text-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/ticket/{data.record.id}"
        ><label
          for="my-modal-3"
          class="btn btn-circle btn-sm absolute right-2 top-2"
          on:click="{() => {
            data.modal = false;
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
