<style>
.collapse-arrow,
.collapse-title:after {
  @apply left-3;
}
</style>

<script>
import { storeUser } from "../stores/user.js";
import { backgroundColor } from "../stores/color.js";
import Header from "$lib/Header_test.svelte";
import Box from "$lib/Box.svelte";

/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}

const tickets = [
  {
    title: "Test",
    author: "Dodo",
    finished: false,
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    created: "21.11.2022",
  },
  {
    title: "Hilfe",
    author: "Dodo",
    finished: true,
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    created: "21.11.2022",
  },
];
</script>

<div class="absolute w-full">
  <div class="mb-5 text-gray-50">
    <Header
      bg="{$backgroundColor}"
      user="{$storeUser ? $storeUser['username'] : undefined}" />
  </div>
  <div class="flex flex-row  justify-center">
    <div
      class="stats shadow bg-{$backgroundColor}-500 text-white shadow-xl hover:shadow-gray-700">
      <div class="stat place-items-center">
        <div class="stat-title">Anfragen</div>
        <div class="stat-value">{tickets.length}</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">... davon bearbeitet</div>
        <div class="stat-value">
          {tickets.filter((ticket) => ticket.finished).length}
        </div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-figure">
          <div
            class="radial-progress"
            style="--value:{(tickets.filter((ticket) => ticket.finished)
              .length /
              tickets.length) *
              100};">
            {Math.round(
              (tickets.filter((ticket) => ticket.finished).length /
                tickets.length) *
                10000
            ) / 100}%
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="mt-10 mb-5">
    <div class="mx-5">
      <Box margin="{false}" clazz="bg-{$backgroundColor}-700">
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
    {#each tickets as ticket}
      <Box margin="{true}" clazz="bg-{$backgroundColor}-500 my-5">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div class="collapse collapse-arrow" tabindex="0">
          <input type="checkbox" class="peer" />
          <div class="collapse-title flex flex-row items-center">
            <div class="ml-7 flex-1 text-3xl font-bold">{ticket.title}</div>
            <div class=" flex-none">
              <div class="grid grid-flow-col gap-5">
                <p>{ticket.created}</p>
                <p>{ticket.author}</p>
                <p>
                  <i class="fa-solid fa-{ticket.finished ? 'check' : 'x'}"></i>
                </p>
              </div>
            </div>
          </div>
          <div class="collapse-content mr-5 flex flex-col">
            <div class="divider"></div>
            <div class="text-2xl font-bold">Nachricht:</div>
            <p>
              {ticket.content}
            </p>
            <div class="divider"></div>
            <a href="#" class="mr-8 place-self-end font-bold"
              >Weiter zum Ticket<i
                class="fa-solid fa-arrow-up-right-from-square ml-2"></i>
            </a>
          </div>
        </div>
      </Box>
    {/each}
  </div>
</div>
