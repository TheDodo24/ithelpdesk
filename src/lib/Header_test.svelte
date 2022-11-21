<script>
// @ts-nocheck
import logo from "$lib/logo.png";

export var user;
export var bg;
</script>

<div
  class="navbar bg-{bg}-500 mx-5 mt-5 w-auto rounded-2xl text-neutral-content">
  <div class="flex-1">
    <a href="/"><img src="{logo}" class="w-60" alt="Logo" /></a>
  </div>
  <div class="flex-none">
    <div class="menu navbar-center menu-horizontal p-0 text-xl text-white">
      <a class="btn btn-ghost text-2xl normal-case" href="/">Home</a>
      {#if user}
        <a class="btn btn-ghost text-2xl normal-case" href="/anfragen"
          >Anfragen</a>
      {/if}

      <a class="btn btn-ghost text-2xl normal-case" href="/scoreboard"
        >Scoreboard</a>
    </div>
    <div class="dropdown-end dropdown text-white">
      {#if user}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label tabindex="0" class="btn btn-ghost rounded-btn text-xl"
          >{user}<i class="fa-solid fa-chevron-down ml-2"></i></label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box mt-4 w-52 bg-base-300 p-2 shadow">
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a class="btn btn-ghost">Mein Profil</a></li>
          <li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              class="btn btn-ghost"
              rel="external"
              href="{'/logout?name=' + user}">Abmelden</a>
          </li>
        </ul>
      {:else}
        <a class="btn btn-ghost text-2xl normal-case" href="/signin"
          >Anmelden</a>
      {/if}
    </div>
  </div>
</div>
