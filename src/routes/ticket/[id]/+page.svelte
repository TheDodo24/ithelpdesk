<script>
import { storeUser } from "../../stores/user.js";
/** @type {import('./$types').PageData} */ export let data;
if (data.user) {
  if (!$storeUser) storeUser.set(data.user);
}
</script>
