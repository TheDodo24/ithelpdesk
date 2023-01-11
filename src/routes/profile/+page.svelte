<script>
import { storeUser } from "$lib/stores/user.js";
import Header from "$lib/Header_test.svelte";
/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}
var modal = false;
var type = "password";
</script>

<div class="absolute w-full h-max">
  <div class="mb-5 text-gray-50">
    <Header user="{$storeUser ? $storeUser['username'] : undefined}" />
  </div>
  <div class="flex justify-center">
    <div class="card my-5 w-2/3 bg-base-300 shadow-xl">
      <div class="card-title mx-5 mt-5">
        <h1 class="text-3xl font-bold">Dein Profil</h1>
      </div>
      <div class="card-body">
        <label for="user" class="text-left">Angemeldet als</label>
        <div class="relative">
          <input
            type="text"
            placeholder="{$storeUser.username}"
            name="password"
            class="input-bordered input w-full max-w-md disabled"
            readonly />
          <button
            class="btn-primary btn items-center absolute right-0 inset-y-0"
            >Name ändern</button>
        </div>
        <div class="divider"></div>
        <label for="email" class="text-left">E-Mail</label>
        <div class="relative">
          <input
            type="email"
            placeholder="{$storeUser.email}"
            name="email"
            class="input-bordered input w-full max-w-md"
            readonly />
          <button
            class="btn-primary btn items-center absolute right-0 inset-y-0"
            >E-Mail ändern</button>
        </div>
        <label for="email" class="text-left mt-5">Passwort</label>
        <div class="relative">
          <input
            type="{type}"
            value="du_bist_doof_123"
            name="password"
            class="input-bordered input w-full max-w-md disabled"
            on:mouseenter="{() => (type = 'text')}"
            on:mouseleave="{() => (type = 'password')}"
            readonly />
          <button
            class="btn-primary btn items-center absolute right-0 inset-y-0"
            >Passwort ändern</button>
        </div>
      </div>
    </div>
  </div>
</div>
