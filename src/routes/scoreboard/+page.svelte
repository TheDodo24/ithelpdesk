<script>
import { storeUser } from "$lib/stores/user.js";
import Header from "$lib/Header_test.svelte";
</script>

<div class="mb-5 w-screen text-gray-50">
  <Header user="{$storeUser ? $storeUser['username'] : undefined}" />
</div>
