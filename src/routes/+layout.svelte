<script>
import { loading } from "$lib/stores/loading.js";
import "../app.css";
import { navigating } from "$app/stores";

$: $loading = !!$navigating;
</script>

<slot />
