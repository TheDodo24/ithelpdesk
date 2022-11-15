<script>
import { backgroundColor } from "../routes/stores/color.js";
/**
 * @type {any}
 */
export let clazz;
</script>

<div
  class="box-border block w-auto {clazz} bg-{$backgroundColor}-500 mt-5 grid rounded-2xl shadow-lg shadow-slate-800 hover:shadow-gray-700">
  <slot />
</div>
