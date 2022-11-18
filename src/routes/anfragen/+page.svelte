<script>
import Header from "$lib/Header_test.svelte";
import { storeUser } from "../stores/user.js";
</script>

<div class="mb-5 w-screen text-gray-50">
  <Header user="{$storeUser ? $storeUser['username'] : undefined}" />
</div>
