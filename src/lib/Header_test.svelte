<script>
// @ts-nocheck
import logo from "$lib/logo.png";
let open = false;
export var user;
</script>

<div
  class="navbar mx-5 mt-5 flex w-auto flex-col rounded-2xl bg-purple-800 text-neutral-content shadow-xl hover:shadow-gray-700 md:flex-row">
  <div class="flex flex-1 flex-row">
    <a href="/"><img src="{logo}" class="w-60" alt="Logo" /></a>
    <button
      class="btn-ghost btn text-2xl md:hidden"
      on:click="{() => (open = !open)}">
      {#if open}
        <i class="fa-solid fa-xmark"></i>
      {:else}
        <i class="fa-solid fa-bars-staggered"></i>
      {/if}
    </button>
  </div>

  <div class="flex flex-col md:block">
    <div
      class="navbar-center menu menu-vertical {!open
        ? 'hidden'
        : ''} p-0 text-xl text-white md:block md:menu-horizontal">
      <a class="btn-ghost btn text-2xl normal-case" href="/">Home</a>
      <a class="btn-ghost btn text-2xl normal-case" href="/faq">FAQ</a>
      {#if user}
        <a class="btn-ghost btn text-2xl normal-case" href="/anfragen"
          >Anfragen</a>
        <a class="btn-ghost btn text-2xl normal-case" href="/scoreboard"
          >Scoreboard</a>
      {/if}
    </div>
    <div
      class="dropdown-end dropdown text-white {!open
        ? 'hidden'
        : ''} md:inline">
      {#if user}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label tabindex="0" class="btn-ghost rounded-btn btn text-xl"
          >{user}<i class="fa-solid fa-chevron-down ml-2"></i></label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box mt-4 w-52 bg-base-300 p-2 shadow">
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a class="btn-ghost btn">Mein Profil</a></li>
          <li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              class="btn-ghost btn"
              rel="external"
              href="{'/logout?name=' + user}">Abmelden</a>
          </li>
        </ul>
      {:else}
        <a class="btn-ghost btn text-2xl normal-case" href="/signin"
          >Anmelden</a>
      {/if}
    </div>
  </div>
</div>
