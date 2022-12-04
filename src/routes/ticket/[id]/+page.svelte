<script>
import Header from "$lib/Header_test.svelte";
import { storeUser } from "$lib/stores/user.js";
import Ticket from "$lib/Ticket.svelte";
import { onMount } from "svelte";
/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}

onMount(() => {
  const requestList = new Ticket({
    target: document.querySelector("div#list"),
    intro: true,
    props: {
      id: data.id,
      modal: data.modal,
    },
  });
});
</script>

<div class="absolute w-full">
  <Header user="{$storeUser.username}" />
  <div id="list"></div>
</div>
