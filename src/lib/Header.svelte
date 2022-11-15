<script>
import logo from "$lib/logo.png";
import { scale } from "svelte/transition";
import { quintOut } from "svelte/easing";
let open = false;
let navbar = false;
let openHandy = false;

/**
 * @type {any}
 */
export let backgroundColor;
/**
 * @type {string}
 */
export let userName;
</script>

<header>
  <nav
    class="static mx-5 mt-5 h-16 w-auto rounded-2xl {backgroundColor} text-xl text-white shadow-lg shadow-slate-700 hover:shadow-slate-600">
    <div
      class="container mx-auto h-16 flex-none flex-wrap items-center justify-between">
      <a href="/" class="flex h-16 items-center justify-start">
        <img src="{logo}" class="mr-3 h-6 sm:h-9" alt="Logo" />
      </a>
      <button
        id="dropdownNavbarLink"
        on:click="{() => {
          navbar = !navbar;
        }}"
        class="right-3 inline-block font-medium md:hidden"
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
              class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-slate-200 md:bg-transparent md:p-0"
              aria-current="page">Home</a>
          </li>
          <li class="mb-2">
            <a
              href="#"
              class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-slate-200 md:bg-transparent md:p-0"
              aria-current="page">Anträge</a>
          </li>
          <li class="mb-2 md:mb-0">
            <a
              href="#"
              class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-slate-200 md:bg-transparent md:p-0"
              aria-current="page">Scoreboard</a>
          </li>
          <li class="block md:hidden">
            <button
              id="dropdownNavbarLink"
              on:click="{() => {
                openHandy = !openHandy;
              }}"
              class="flex w-full items-center justify-between rounded-2xl bg-purple-900 py-2 pr-4 pl-3 font-medium  hover:text-slate-200"
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
                    class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-slate-200"
                    >Mein Profil</a>
                </li>
              </ul>
              <div class="py-1">
                <a
                  href="#"
                  class="block rounded-2xl bg-purple-900 py-2 pl-3 pr-4 hover:text-slate-200"
                  >Abmelden</a>
              </div>
            </div>
          {/if}
        </ul>
      </div>
      <div class="mr-5 hidden justify-end md:block md:w-auto">
        {#if userName}
          <div class="dropdown-end dropdown">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <label tabindex="0" class="btn btn-ghost rounded-btn text-lg"
              >{userName}<i class="fa-solid fa-chevron-down ml-3"></i></label>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul
              tabindex="0"
              class="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow">
              <li><a>Mein Profil</a></li>
              <li><a>Abmelden</a></li>
            </ul>
          </div>
        {:else}
          <div
            class="py-2 pr-4 pl-3 font-medium hover:text-slate-200 md:w-auto md:border-0 md:p-0">
            <a href="/signin">Anmelden</a>
          </div>
        {/if}
      </div>
    </div>
  </nav>
</header>
