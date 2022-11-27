<style>
.collapse-arrow,
.collapse-title:after {
  @apply left-3;
}
</style>

<script>
import { tickets } from "$lib/stores/tickets.js";
import Box from "$lib/Box.svelte";
import { Shadow } from "svelte-loading-spinners";
let promise;
if (!$tickets) {
  promise = requestJson();
}

console.log($tickets);

async function requestJson() {
  const req = await fetch("/api/requests/list.json");
  let response = await req.text();
  let json = JSON.parse(response);
  $tickets = json;
  if (req.ok) return json;
  else return new Error(response);
}
</script>

{#if !$tickets}
  {#await promise}
    <div class="flex items-center justify-center content-center mt-32">
      <Shadow size="60" color="#7E22CE" unit="px" duration="2.5s" />
    </div>
  {:then requests}
    <div class="flex flex-col">
      <div class="flex justify-center">
        <div
          class="stats bg-purple-700 text-white shadow-xl hover:shadow-gray-700">
          <div class="stat place-items-center">
            <div class="stat-title">Anfragen</div>
            <div class="stat-value">{Object.keys(requests).length}</div>
          </div>

          <div class="stat place-items-center">
            <div class="stat-title">... davon bearbeitet</div>
            <div class="stat-value">
              {Object.keys(requests).filter((key) => requests[key].finished)
                .length}
            </div>
          </div>

          <div class="stat place-items-center">
            <div class="stat-figure">
              <div
                class="radial-progress"
                style="--value:{(Object.keys(requests).filter(
                  (key) => requests[key].finished
                ).length /
                  Object.keys(requests).length) *
                  100};">
                {Math.round(
                  (Object.keys(requests).filter((key) => requests[key].finished)
                    .length /
                    (Object.keys(requests).length == 0
                      ? 1
                      : Object.keys(requests).length)) *
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
      {#each Object.keys(requests) as key}
        <Box margin="{true}" clazz="bg-purple-700 my-5">
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <div class="collapse-arrow collapse" tabindex="0">
            <input type="checkbox" class="peer" />
            <div class="collapse-title flex flex-row items-center">
              <div class="ml-7 flex-1 text-3xl font-bold">
                {requests[key].title}
              </div>
              <div class=" flex-none">
                <div class="grid grid-flow-col gap-5">
                  <p>
                    {requests[key].created}
                  </p>
                  <p>{requests[key].author}</p>
                  <p>
                    <i
                      class="fa-solid fa-{requests[key].finished
                        ? 'check'
                        : 'x'}"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="collapse-content mr-5 flex flex-col">
              <div class="divider"></div>
              <div class="text-2xl font-bold">Nachricht:</div>
              <p>
                {@html requests[key].content}
              </p>
              {#if requests[key].files.length > 0}
                <div class="divider"></div>
                <div class="text-2xl font-bold">Dateien:</div>
                <div class="mt-2 grid gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {#each requests[key].files as file}
                    <a class="inline-block" href="{file}"
                      ><i class="fa-solid fa-file mr-2"></i>{file.split("/")[
                        file.split("/").length - 1
                      ]}</a>
                  {/each}
                </div>
              {/if}
              <div class="divider"></div>
              <a href="/ticket/{key}" class="mr-8 place-self-end font-bold"
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
  {/await}
{:else}
  <div class="flex flex-col">
    <div class="flex justify-center">
      <div
        class="stats bg-purple-700 text-white shadow-xl hover:shadow-gray-700">
        <div class="stat place-items-center">
          <div class="stat-title">Anfragen</div>
          <div class="stat-value">{Object.keys($tickets).length}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">... davon bearbeitet</div>
          <div class="stat-value">
            {Object.keys($tickets).filter((key) => $tickets[key].finished)
              .length}
          </div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-figure">
            <div
              class="radial-progress"
              style="--value:{(Object.keys($tickets).filter(
                (key) => $tickets[key].finished
              ).length /
                Object.keys($tickets).length) *
                100};">
              {Math.round(
                (Object.keys($tickets).filter((key) => $tickets[key].finished)
                  .length /
                  (Object.keys($tickets).length == 0
                    ? 1
                    : Object.keys($tickets).length)) *
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
    {#each Object.keys($tickets) as key}
      <Box margin="{true}" clazz="bg-purple-700 my-5">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div class="collapse-arrow collapse" tabindex="0">
          <input type="checkbox" class="peer" />
          <div class="collapse-title flex flex-row items-center">
            <div class="ml-7 flex-1 text-3xl font-bold">
              {$tickets[key].title}
            </div>
            <div class=" flex-none">
              <div class="grid grid-flow-col gap-5">
                <p>
                  {$tickets[key].created}
                </p>
                <p>{$tickets[key].author}</p>
                <p>
                  <i
                    class="fa-solid fa-{$tickets[key].finished ? 'check' : 'x'}"
                  ></i>
                </p>
              </div>
            </div>
          </div>
          <div class="collapse-content mr-5 flex flex-col">
            <div class="divider"></div>
            <div class="text-2xl font-bold">Nachricht:</div>
            <p>
              {@html $tickets[key].content}
            </p>
            {#if $tickets[key].files.length > 0}
              <div class="divider"></div>
              <div class="text-2xl font-bold">Dateien:</div>
              <div class="mt-2 grid gap-5 md:grid-cols-3 lg:grid-cols-4">
                {#each $tickets[key].files as file}
                  <a class="inline-block" href="{file}"
                    ><i class="fa-solid fa-file mr-2"></i>{file.split("/")[
                      file.split("/").length - 1
                    ]}</a>
                {/each}
              </div>
            {/if}
            <div class="divider"></div>
            <a href="/ticket/{key}" class="mr-8 place-self-end font-bold"
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
{/if}
