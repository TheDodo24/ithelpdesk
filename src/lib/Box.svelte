<script>
/**
 * @type {any}
 */
export let clazz;
</script>

<div
  class="box-border block w-auto {clazz} grid rounded-2xl shadow-lg hover:shadow-gray-700">
  <div class="my-5 mx-5">
    <slot />
  </div>
</div>
