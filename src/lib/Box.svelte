<script>
/**
 * @type {any}
 */
export let clazz;
/**
 * @type {any}
 */
export let margin;
</script>

<div
  class="box-border block w-auto {clazz} grid rounded-2xl shadow-lg hover:shadow-gray-700">
  <div class="{!margin ? 'my-5 mx-5' : ''}">
    <slot />
  </div>
</div>
