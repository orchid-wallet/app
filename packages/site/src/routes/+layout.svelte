<script lang="ts">
  import '../app.css';
  import Navbar from './Navbar.svelte';
</script>
<div class="w-full h-full">
  <Navbar />
  <slot />
  <UiToast />
  <UtilCopyToClipboard />
</div>
