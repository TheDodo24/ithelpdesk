<style>
.website-divider {
  border-top: 8px solid;
  animation: rainbow-text 2.5s linear;
  animation-iteration-count: infinite;
}

.aramarkio {
  animation: rainbow-text 2.5s linear;
  animation-iteration-count: infinite;
}

.aramarkio:hover {
  animation: grow 5s linear;
  animation-iteration-count: infinite;
}

@keyframes grow {
  100%,
  0% {
    color: rgb(0, 255, 255);
    font-size: 1.5rem;
  }
  8% {
    color: rgb(0, 127, 255);
  }
  16% {
    color: rgb(0, 0, 255);
  }
  25% {
    color: rgb(127, 0, 255);
    font-size: 1.75rem;
  }
  33% {
    color: rgb(255, 0, 255);
  }
  41% {
    color: rgb(255, 0, 127);
    font-size: 2rem;
  }
  50% {
    color: rgb(255, 0, 0);
  }
  58% {
    color: rgb(255, 127, 0);
  }
  66% {
    color: rgb(255, 255, 0);
  }
  75% {
    color: rgb(127, 255, 0);
    font-size: 1.75rem;
  }
  83% {
    color: rgb(0, 255, 0);
  }
  91% {
    color: rgb(0, 255, 127);
    font-size: 1.5rem;
  }
}

@keyframes rainbow-text {
  100%,
  0% {
    color: rgb(0, 255, 255);
  }
  8% {
    color: rgb(0, 127, 255);
  }
  16% {
    color: rgb(0, 0, 255);
  }
  25% {
    color: rgb(127, 0, 255);
  }
  33% {
    color: rgb(255, 0, 255);
  }
  41% {
    color: rgb(255, 0, 127);
  }
  50% {
    color: rgb(255, 0, 0);
  }
  58% {
    color: rgb(255, 127, 0);
  }
  66% {
    color: rgb(255, 255, 0);
  }
  75% {
    color: rgb(127, 255, 0);
  }
  83% {
    color: rgb(0, 255, 0);
  }
  91% {
    color: rgb(0, 255, 127);
  }
}
</style>

<script>
// @ts-ignore
import Header from "$lib/Header.svelte";
import Box from "$lib/Box.svelte";
import { time } from "./time.js";

const formatter = Intl.DateTimeFormat("de", {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
});

const dayFormatter = Intl.DateTimeFormat("de", {
  dateStyle: "full",
});
</script>

<div>
  <Header />

  <div class="mx-5 h-max w-auto text-gray-50">
    <div class="grid grid-cols-3 gap-10">
      <div>
        <Box clazz="h-auto content-around">
          <h1 class="mx-5 mt-5 text-6xl font-bold">
            {formatter.format($time)}
          </h1>
          <h2 class="mx-5 mb-5 text-3xl">{dayFormatter.format($time)}</h2>
        </Box>
        <Box clazz="h-auto items-center">
          <div class="mx-5 my-5 grid grid-cols-2">
            <p class="col-span-2 mx-3 text-sm">
              If you can't explain it simply, you don't understand it well
              enough.
            </p>
            <i class="fa-solid fa-quote-right fa-2xl mt-4"></i>
            <p class="font-bold">Albert Einstein</p>
          </div>
        </Box>
        <Box clazz="h-44 content-around">
          <p class="mx-5 text-xl">Angemeldet als</p>
          <p class="mx-5 text-5xl font-bold">Felix</p>
          <div class="mx-5">
            <p><i class="fa-solid fa-ranking-star mr-2"></i>Ober Noob</p>
            <p><i class="fa-solid fa-medal mr-2"></i> -10000</p>
          </div>
        </Box>
        <Box clazz="h-auto content-around">
          <p class="ml-5 mt-5 text-2xl font-bold underline">Deine Anfragen</p>
          <ul class="my-5 ml-5">
            <li>Wieso geht das nicht?</li>
          </ul>
        </Box>
      </div>
      <div>
        <Box clazz="h-auto">
          <h1 class="ml-5 mt-5 text-2xl font-bold">Bild des Tages</h1>
          <div class="my-5 flex justify-center">
            <img
              class="w-10/12"
              src="https://apod.nasa.gov/apod/image/2211/LunarEclipseRyanHan.jpg"
              alt="Picture of the day" />
          </div>
        </Box>
        <Box clazz="h-auto">
          <div class="my-5 ml-5">
            <h1 class="text-2xl font-bold">Scoreboard</h1>
            <ul class="ml-5 mt-2 list-inside list-decimal">
              <li>Hallo</li>
              <li>test</li>
              <li>Hallo</li>
              <li>test</li>
              <li>Hallo</li>
              <li>test</li>
            </ul>
          </div>
        </Box>
      </div>
      <div>
        <Box
          clazz="h-auto flex justify-end items-center text-right place-self-end">
          <div class="my-5 mr-5">
            <img
              class="w-36 place-self-end"
              src="https://developer.accuweather.com/sites/default/files/01-s.png"
              alt="Weather" />
            <h1 class="text-2xl font-bold">Überwiegend Sonne - 14.2°C</h1>
            <h1 class="text-xl">Wind 11.7km/h | SSW</h1>
            <h1 class="text-xl">UV-Index 2 / Niedrig</h1>
            <h1 class="text-xl">Sicht 16.1km</h1>
          </div>
        </Box>
        <Box
          clazz="h-auto flex justify-end items-center text-right place-self-end">
          <div class="my-5 mx-5 whitespace-pre-line">
            <h1 class="text-2xl font-bold">Aramark-Menu am 10.11.2022</h1>
            <ul
              class="my-2 list-inside list-none items-center divide-y-2 whitespace-normal align-middle">
              <li>
                Smoothie Bananen-Beeren und Birne<span class="pl-5"
                  ><i class="fa-solid fa-sack-dollar mr-2"></i>5€</span>
              </li>
              <li class="mt-3">
                Vitaminbar Bircher Müsli mit Frucht<span class="pl-5"
                  ><i class="fa-solid fa-sack-dollar mr-2"></i>10€</span>
              </li>
              <li class="mt-3">
                Hausgemachter Gaisburger Marsch mit Karotte, Sellerie, Spätzle,
                Kartoffeln und Rindfleisch, dazu ein ofenfrisches Brötchen <span
                  class="pl-5"
                  ><i class="fa-solid fa-sack-dollar mr-2"></i>10€</span>
              </li>
            </ul>
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
