<script lang="ts">
  import '../tailwind-output.css';
</script>
<div class="w-full h-full">
  <slot />
  <UiToast />
  <UtilCopyToClipboard />
</div>
