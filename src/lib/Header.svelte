<script>
import logo from "$lib/logo.png";
import { flip } from "svelte/animate";
import { scale } from "svelte/transition";
import { fly } from "svelte/transition";
import { quintOut } from "svelte/easing";
let open = false;
let navbar = false;
let openHandy = false;
</script>

<header class="class">
  <nav
    class="static mx-5 mt-5 h-16 w-auto rounded-2xl bg-purple-900 text-xl text-slate-300 shadow-lg shadow-slate-700 hover:shadow-slate-600">
    <div
      class="container mx-auto flex h-16 flex-wrap items-center justify-between">
      <a href="/" class="flex h-16 items-center justify-start">
        <img src="{logo}" class="mr-3 h-6 sm:h-9" alt="Logo" />
      </a>
      <button
        id="dropdownNavbarLink"
        on:click="{() => {
          navbar = !navbar;
        }}"
        class="relative right-3 inline-block justify-center font-medium  hover:text-white md:hidden"
        ><svg
          class="ml-1 h-5 w-5 {open ? 'rotate-180' : 'rotate-0'}"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill="white"
            d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
          ></path
          ></svg
        ></button>
      <div
        hidden="{!navbar}"
        class="relative w-full md:block md:w-auto"
        id="navbar-default">
        <ul
          class="mt-7 flex flex-col md:mr-12 md:mt-0 md:flex-row md:space-x-8">
          <li class="mb-2">
            <a
              href="/"
              class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-white md:bg-transparent md:p-0"
              aria-current="page">Home</a>
          </li>
          <li class="mb-2">
            <a
              href="#"
              class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-white md:bg-transparent md:p-0"
              aria-current="page">Anträge</a>
          </li>
          <li class="mb-2 md:mb-0">
            <a
              href="#"
              class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-white md:bg-transparent md:p-0"
              aria-current="page">Scoreboard</a>
          </li>
          <li class="block md:hidden">
            <button
              id="dropdownNavbarLink"
              on:click="{() => {
                openHandy = !openHandy;
              }}"
              class="flex w-full items-center justify-between rounded-2xl bg-purple-900 py-2 pr-4 pl-3 font-medium  hover:text-white"
              >Domenic <svg
                class="ml-1 h-5 w-5 {openHandy ? 'rotate-180' : 'rotate-0'}"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path
                ></svg
              ></button>
          </li>
          {#if openHandy}
            <div
              id="dropdownNavbar"
              transition:scale="{{
                duration: 300,
                easing: quintOut,
              }}"
              hidden="{!openHandy}">
              <ul
                class="mt-2 flex flex-col"
                aria-labelledby="dropdownLargeButton">
                <li>
                  <a
                    href="#"
                    class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-white"
                    >Mein Profil</a>
                </li>
              </ul>
              <div class="py-1">
                <a
                  href="#"
                  class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-white"
                  >Abmelden</a>
              </div>
            </div>
          {/if}
        </ul>
      </div>
      <div class="mr-5 hidden md:block md:w-auto">
        <button
          id="dropdownNavbarLink"
          on:click="{() => {
            open = !open;
          }}"
          class="flex w-full items-center justify-between rounded py-2 pr-4 pl-3 font-medium  hover:text-white md:w-auto md:border-0 md:p-0 "
          >Domenic <svg
            class="ml-1 h-5 w-5 {open ? 'rotate-180' : 'rotate-0'}"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"></path
            ></svg
          ></button>
        {#if open}
          <div
            id="dropdownNavbar"
            transition:scale="{{
              duration: 300,
              easing: quintOut,
            }}"
            hidden="{!open}"
            class="absolute z-10 w-44 divide-y rounded bg-gray-700 font-normal text-slate-300 shadow md:right-10 md:mt-2">
            <ul class="py-1 text-sm" aria-labelledby="dropdownLargeButton">
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Mein Profil</a>
              </li>
            </ul>
            <div class="py-1">
              <a
                href="#"
                class="block py-2 px-4 text-sm text-slate-300 hover:bg-gray-600 hover:text-white "
                >Abmelden</a>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </nav>
</header>
