<script>
import { storeUser } from "../stores/user.js";
import { backgroundColor } from "../stores/color.js";
import Header from "$lib/Header_test.svelte";
</script>

<div class="mb-5 w-screen text-gray-50">
  <Header
    bg="{$backgroundColor}"
    user="{$storeUser ? $storeUser['username'] : undefined}" />
</div>
