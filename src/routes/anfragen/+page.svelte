<style>
.collapse-arrow,
.collapse-title:after {
  @apply left-3;
}
</style>

<script>
import { storeUser } from "../stores/user.js";
import Header from "$lib/Header_test.svelte";
import Box from "$lib/Box.svelte";

/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}
var modal = data.modal;
</script>

<div class="absolute w-full">
  <div class="mb-5 text-gray-50">
    <Header user="{$storeUser ? $storeUser['username'] : undefined}" />
  </div>
  <div class="flex flex-col">
    <div class="flex justify-center">
      <div
        class="stats bg-purple-700 text-white shadow-xl hover:shadow-gray-700">
        <div class="stat place-items-center">
          <div class="stat-title">Anfragen</div>
          <div class="stat-value">{data.records.length}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">... davon bearbeitet</div>
          <div class="stat-value">
            {data.records.filter((ticket) => ticket.finished).length}
          </div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-figure">
            <div
              class="radial-progress"
              style="--value:{(data.records.filter((ticket) => ticket.finished)
                .length /
                data.records.length) *
                100};">
              {Math.round(
                (data.records.filter((ticket) => ticket.finished).length /
                  (data.records.length == 0 ? 1 : data.records.length)) *
                  10000
              ) / 100}%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mr-5 flex justify-end">
      <a href="/new-ticket"
        ><button class="btn bg-purple-800 text-white hover:bg-purple-900"
          >+ Anfrage stellen</button
        ></a>
    </div>
  </div>
  <div class="divider"></div>
  <div class="mt-10 mb-5">
    <div class="mx-5">
      <Box margin="{false}" clazz="bg-purple-800">
        <div class="flex flex-row text-white">
          <div class="flex-1 place-self-center">Titel</div>
          <div class=" flex-none place-self-center">
            <div class="grid grid-flow-col gap-5">
              <p>Erstellt am</p>
              <p>von</p>
              <p>Abgeschlossen</p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  </div>
  <div class="mx-5 mt-9 text-white">
    {#each data.records as record}
      <Box margin="{true}" clazz="bg-purple-700 my-5">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div class="collapse-arrow collapse" tabindex="0">
          <input type="checkbox" class="peer" />
          <div class="collapse-title flex flex-row items-center">
            <div class="ml-7 flex-1 text-3xl font-bold">{record.title}</div>
            <div class=" flex-none">
              <div class="grid grid-flow-col gap-5">
                <p>
                  {record.created}
                </p>
                <p>{record.author}</p>
                <p>
                  <i class="fa-solid fa-{record.finished ? 'check' : 'x'}"></i>
                </p>
              </div>
            </div>
          </div>
          <div class="collapse-content mr-5 flex flex-col">
            <div class="divider"></div>
            <div class="text-2xl font-bold">Nachricht:</div>
            <p>
              {@html record.content}
            </p>
            {#if record.files.length > 0}
              <div class="divider"></div>
              <div class="text-2xl font-bold">Dateien:</div>
              <div class="mt-2 grid gap-5 md:grid-cols-3 lg:grid-cols-4">
                {#each record.files as file}
                  <a class="inline-block" href="{file}"
                    ><i class="fa-solid fa-file mr-2"></i>{file.split("/")[
                      file.split("/").length - 1
                    ]}</a>
                {/each}
              </div>
            {/if}
            <div class="divider"></div>
            <a href="/ticket/{record.id}" class="mr-8 place-self-end font-bold"
              >Weiter zum Ticket<i
                class="fa-solid fa-arrow-up-right-from-square ml-2"></i>
            </a>
          </div>
        </div>
      </Box>
    {:else}
      <p class="text-3xl font-bold">Es wurden keine Tickets erstellt.</p>
    {/each}
  </div>
</div>

{#if modal}
  <div class="modal {modal ? 'modal-open' : ''}">
    <div class="modal-box relative items-center text-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/anfragen"
        ><label
          for="my-modal-3"
          class="btn btn-circle btn-sm absolute right-2 top-2"
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
      <h3 class="py-4 text-lg font-bold">Ticket erfolgreich erstellt</h3>
      <p class="">
        Dein Ticket wurde erfolgreich erstellt und wird sobald wie möglich
        bearbeitet.
      </p>
    </div>
  </div>
{/if}
