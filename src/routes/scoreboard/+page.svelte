<script>
import { storeUser } from "$lib/stores/user.js";
import Header from "$lib/Header_test.svelte";
import Scoreboard from "./Scoreboard.svelte";
import { onMount } from "svelte";

/** @type {import('./$types').PageData} */ export let data;

if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}

onMount(() => {
  const scoreboard = new Scoreboard({
    target: document.querySelector("div#list"),
    intro: true,
  });
});
</script>

<div class="absolute w-full">
  <div class="mb-5 text-gray-50">
    <Header user="{$storeUser ? $storeUser['username'] : undefined}" />
  </div>
  <div id="list"></div>
</div>
