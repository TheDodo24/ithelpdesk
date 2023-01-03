<script>
// @ts-nocheck

// @ts-ignore
import { time } from "$lib/stores/time.js";
import { storeUser } from "$lib/stores/user.js";
import { menu } from "$lib/stores/menu.js";
import { potd } from "$lib/stores/potd.js";
import { weatherJson } from "$lib/stores/weather.js";
import { tickets } from "$lib/stores/tickets.js";
import Header from "$lib/Header_test.svelte";
import Box from "$lib/Box.svelte";
import { onMount } from "svelte";
import ranks from "$lib/ranks.json";
//import style from "./startpage.css";

/** @type {import('./$types').PageData} */ export let data;

const formatter = Intl.DateTimeFormat("de", {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
});

const dayFormatter = Intl.DateTimeFormat("de", {
  dateStyle: "full",
});

const dateFormatter = Intl.DateTimeFormat("de", {
  dateStyle: "short",
});

let quoteJson = {
  text: "",
  author: "",
};

var modal = true;

onMount(async () => {
  getQuotes(window);
  setInterval(async () => getQuotes(window), 60 * 1000);

  getWeather(window);
  getPOTD(window);
  getMenu(window);
  getTickets(window);
});

/**
 * @param {Window & typeof globalThis} window
 */
async function getQuotes(window) {
  const url = "/api/quotes/quotes.json";
  const resp = await fetch(url, {
    method: "GET",
  });
  let text = await resp.text();
  quoteJson = JSON.parse(text);
}

async function getMenu(window) {
  const url = "/api/menu/menu.json";
  let res;
  res = await fetch(url, {
    method: "GET",
  });
  let text = await res.text();
  if (res.status == 200) {
    $menu = JSON.parse(text);
  } else {
    $menu = "not-found";
  }
}

async function getPOTD(window) {
  const imgres = await fetch("/api/picture/image.json");

  $potd = JSON.parse(await imgres.text());
}

async function getWeather(window) {
  const weatherRes = await fetch("/api/weather/weather.json");
  $weatherJson = JSON.parse(await weatherRes.text());
}

async function getTickets(window) {
  const ticketRes = await fetch("api/requests/list.json");
  $tickets = JSON.parse(await ticketRes.text());
}
var rank = undefined;
if (data.user) {
  $storeUser = data.user;
  rank =
    ranks[
      Object.keys(ranks).find(
        (key) =>
          Object.keys(ranks)
            .map((key) => parseInt(key))
            .filter((key) => $storeUser["points"] >= key)
            .pop() == key
      )
    ];
} else {
  $storeUser = undefined;
}
</script>

<div class="static w-screen">
  <div class="absolute">
    <Header user="{$storeUser ? $storeUser['username'] : undefined}" />

    <div class="mx-5 mb-5 text-gray-50">
      <div class="flex flex-col gap-10 md:grid md:grid-cols-3">
        <div>
          <Box clazz="mt-5 h-auto content-around bg-purple-700">
            <h1 class="text-6xl font-bold">
              {formatter.format($time)}
            </h1>
            <h2 class="text-3xl">{dayFormatter.format($time)}</h2>
          </Box>
          <Box clazz="mt-5 h-auto items-center bg-purple-700">
            {#if quoteJson["text"] != ""}
              <div class="grid grid-cols-2">
                <p class="col-span-2 mx-3 text-sm">
                  {quoteJson["text"]}
                </p>
                <i class="fa-solid fa-quote-right fa-2xl mt-4"></i>
                <p class="font-bold">{quoteJson["author"]}</p>
              </div>
            {:else}
              <div class="mx-5 my-5 flex animate-pulse">
                <div class="mx-3 h-10 w-32 rounded-full bg-white"></div>
                <i class="fa-solid fa-quote-right fa-2xl mt-4"></i>
              </div>
            {/if}
          </Box>
          <Box clazz="mt-5 h-auto bg-purple-700">
            {#if $storeUser}
              <div class="content-around">
                <p class="text-xl">Angemeldet als</p>
                <p class="text-5xl font-bold">{$storeUser["username"]}</p>
                <div class="divider"></div>
                <p>
                  <i class="fa-solid fa-ranking-star mr-5"></i>{rank.name}<i
                    class="fa-solid fa-{rank.picture} ml-2"></i>
                </p>
                <p>
                  <i class="fa-solid fa-medal mr-5"></i>
                  {$storeUser["points"].toLocaleString("de")}
                </p>
              </div>
            {:else}
              <p class="text-3xl">Du bist nicht angemeldet</p>
              <a href="/signin" class="mt-8 text-xl underline"
                >Anmelden<i class="fa-solid fa-arrow-right ml-2"></i></a>
            {/if}
          </Box>
          {#if $storeUser}
            <Box clazz="mt-5 h-auto bg-purple-700">
              <p class="text-2xl font-bold underline">Deine Anfragen</p>
              {#if $tickets}
                <ul class="mt-2 list-inside list-disc">
                  {#each Object.keys($tickets) as key, i}
                    {#if i <= 8}
                      <li>
                        <a href="/ticket/{key}">{$tickets[key].title}</a>
                      </li>
                    {/if}
                  {/each}
                  {#if Object.keys($tickets).length > 8}
                    <div class="mt-2">
                      <a href="/anfragen" class="underline"
                        >... und {Object.keys($tickets).length - 8} weitere Tickets<i
                          class="fa-solid fa-arrow-up-right-from-square ml-2"
                        ></i
                        ></a>
                    </div>
                  {:else if Object.keys($tickets).length == 0}
                    <p class="mt-2">Du hast keine Tickets.</p>
                  {/if}
                </ul>
              {:else}
                <div class="flex justify-center">
                  <div class="ml-2 flex-row">
                    <svg class="h-10 w-10 animate-spin" viewBox="0 0 24 24">
                      <circle
                        class="opacity-0"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                        data-darkreader-inline-stroke=""
                        style="--darkreader-inline-stroke:currentColor;"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        data-darkreader-inline-fill=""
                        style="--darkreader-inline-fill:currentColor;"></path>
                    </svg>
                    <p class="ml-5 mt-10 place-self-start text-left">
                      Lade Tickets ...
                    </p>
                  </div>
                </div>{/if}
            </Box>
          {/if}
        </div>
        <div>
          <Box clazz="mt-5 h-auto bg-purple-700">
            <h1 class="text-2xl font-bold">Bild des Tages</h1>
            <div class="mt-5 flex flex-row justify-center">
              {#if $potd != ""}
                <!-- svelte-ignore a11y-img-redundant-alt -->
                {#if $potd["media"] === "video"}
                  <a
                    href="{$potd['src']}"
                    class="underline"
                    target="_blank"
                    rel="noreferrer"
                    ><i class="fa-solid fa-arrow-up-right-from-square mr-3"></i
                    >YouTube-Link</a>
                {:else}
                  <img src="{$potd['src']}" alt="Picture of the day" />
                {/if}
              {:else}
                <div class="flex justify-center">
                  <svg class="h-10 w-10 animate-spin" viewBox="0 0 24 24">
                    <circle
                      class="opacity-0"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                      data-darkreader-inline-stroke=""
                      style="--darkreader-inline-stroke:currentColor;"></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      data-darkreader-inline-fill=""
                      style="--darkreader-inline-fill:currentColor;"></path>
                  </svg>
                  <p class="ml-5 mt-10 place-self-center">Lade NASA POTD ...</p>
                </div>
              {/if}
            </div>
          </Box>
          <Box clazz="mt-5 h-auto bg-purple-700">
            <h1 class="text-2xl font-bold">Scoreboard</h1>
            <ul class="ml-5 mt-2 list-inside list-decimal">
              <li>Hallo</li>
              <li>test</li>
              <li>Hallo</li>
              <li>test</li>
              <li>Hallo</li>
              <li>test</li>
            </ul>
          </Box>
        </div>
        <div>
          <Box
            clazz="mt-5 h-auto flex justify-end items-center text-right place-self-end bg-purple-700">
            {#if Object.keys($weatherJson).length > 0}
              <img
                class="w-28 place-self-end"
                src="{$weatherJson['weatherIcon']}"
                alt="Weather" />
              <h1 class="text-2xl font-bold">
                {$weatherJson["weatherText"]} - {$weatherJson["temperature"][
                  "value"
                ]}°C
              </h1>
              <h1 class="text-xl">
                <i class="fa-solid fa-temperature-high"></i><span class="ml-5"
                  >{$weatherJson["temperature"]["max"]}°C</span>
                |
                <i class="fa-solid fa-temperature-low ml-5"></i><span
                  class="ml-2">{$weatherJson["temperature"]["min"]}°C</span>
              </h1>
              <h1 class="text-xl">
                <i class="fa-solid fa-wind mr-5"></i>{$weatherJson["wind"][
                  "speed"
                ]}km/h |
                <i class="fa-solid fa-compass ml-5 mr-2"></i>{$weatherJson[
                  "wind"
                ]["degrees"]}°
              </h1>
            {:else}
              <div class="flex justify-center">
                <svg class="h-10 w-10 animate-spin" viewBox="0 0 24 24">
                  <circle
                    class="opacity-0"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    data-darkreader-inline-stroke=""
                    style="--darkreader-inline-stroke:currentColor;"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    data-darkreader-inline-fill=""
                    style="--darkreader-inline-fill:currentColor;"></path>
                </svg>
                <p class="ml-5 mt-10 place-self-center">
                  Lade Wetterdaten für Ditzingen ...
                </p>
              </div>
            {/if}
          </Box>
          <Box
            clazz="mt-5 h-auto flex justify-end items-center text-right place-self-end bg-purple-700">
            <div class="whitespace-pre-line">
              <h1 class="text-2xl font-bold">
                Aramark-Menü am {dateFormatter.format($time)}
              </h1>

              {#if $menu == "not-found"}
                <p>Menü konnte nicht geladen werden.</p>
                <a
                  href="https://mein.aramark.de/thales-deutschland/menuplan/"
                  target="_blank"
                  rel="noreferrer"
                  class="hover:text-slate-200">
                  <i class="fa-solid fa-square-up-right mr-2 "></i>Aramark
                  Website</a>
              {:else}
                <ul
                  class="my-2 list-inside list-none items-center divide-y-2 whitespace-normal align-middle">
                  {#each $menu as m}
                    <li class="mt-3">
                      {m["title"] + " " + m["text"]}<span class="pl-5"
                        ><i class="fa-solid fa-sack-dollar mr-2"></i>{m[
                          "price"
                        ]}</span>
                    </li>
                  {:else}
                    <div class="flex justify-center">
                      <svg class="h-10 w-10 animate-spin" viewBox="0 0 24 24">
                        <circle
                          class="opacity-0"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                          data-darkreader-inline-stroke=""
                          style="--darkreader-inline-stroke:currentColor;"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          data-darkreader-inline-fill=""
                          style="--darkreader-inline-fill:currentColor;"></path>
                      </svg>
                      <p class="ml-5 mt-10 place-self-center">
                        Lade Aramark Menü ...
                      </p>
                    </div>
                  {/each}
                </ul>
              {/if}
              <hr class="website-divider mt-5" />
              <a
                class="aramarkio mt-2 text-xl font-bold"
                href="https://aramarkio.vercel.app"
                >Hier gehts zur besseren Übersicht <i
                  class="fa-solid fa-arrow-up-right-from-square ml-2"></i
                ></a>
            </div>
          </Box>
        </div>
      </div>
    </div>
  </div>
</div>
{#if data.op == "login" || data.op == "register" || data.op == "logout" || data.op == "reset"}
  <div class="modal {modal ? 'modal-open' : ''}">
    <div class="modal-box relative items-center text-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/"
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
        {#if data.op == "login" || data.op == "register"}
          Herzlich Willkommen{data.op == "login"
            ? " zurück " + $storeUser["username"]
            : ""}
        {:else if data.op == "reset"}
          Zurücksetzen erfolgreich.
        {:else}
          Bis Bald, {data.name}
        {/if}
      </h3>
      <p class="">
        {#if data.op == "reset"}
          Es wurde ein Link an deine E-Mail versendet, falls diese in unserer
          Datenbank existiert.
        {:else}
          Du hast dich erfolgreich {data.op == "login"
            ? "eingeloggt"
            : data.op == "logout"
            ? "ausgeloggt"
            : "registriert"}!
        {/if}
      </p>
      {#if data.op == "register"}
        <p>
          Verifiziere deine E-Mail Adresse, mit der E-Mail die du gerade von uns
          bekommen hast.
        </p>
      {/if}
    </div>
  </div>
{/if}
