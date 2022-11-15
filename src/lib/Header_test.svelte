<script>
import logo from "$lib/logo.png";
import { scale } from "svelte/transition";
import { quintOut } from "svelte/easing";
import { user } from "$app/paths";
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

<div
  class="navbar {backgroundColor} mx-5 mt-5 w-auto rounded-2xl text-neutral-content">
  <div class="flex-1">
    <a href="/"><img src="{logo}" class="w-60" alt="Logo" /></a>
  </div>
  <div class="flex-none">
    <div class="menu navbar-center menu-horizontal p-0 text-xl text-white">
      <a class="btn btn-ghost text-2xl normal-case" href="/">Home</a>

      <a class="btn btn-ghost text-2xl normal-case" href="#">Anträge</a>

      <a class="btn btn-ghost text-2xl normal-case" href="#">Scoreboard</a>
    </div>
    <div class="dropdown-end dropdown text-white">
      {#if userName}
        <label tabindex="0" class="btn btn-ghost rounded-btn text-xl"
          >{userName}<i class="fa-solid fa-chevron-down ml-2"></i></label>
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow">
          <li><a class="btn btn-ghost">Mein Profil</a></li>
          <li><a class="btn btn-ghost" on:click="{user.del}">Abmelden</a></li>
        </ul>
      {:else}
        <a class="btn btn-ghost text-2xl normal-case" href="/signin"
          >Anmelden</a>
      {/if}
    </div>
  </div>
</div>
