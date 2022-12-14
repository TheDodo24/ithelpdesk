<script>
import { storeUser } from "$lib/stores/user.js";
import Header from "$lib/Header_test.svelte";

/** @type {import('./$types').PageData} */ export let data;

if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}
</script>

<div class="mb-5 w-screen text-gray-50">
  <Header user="{$storeUser ? $storeUser['username'] : undefined}" />
</div>
