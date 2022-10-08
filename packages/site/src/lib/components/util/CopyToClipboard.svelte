<script lang="ts">
  import { utilStore } from '$lib/stores/util';
  import { browser } from '$app/environment';

  let name: string | null;
  let textarea: HTMLTextAreaElement;

  $: if (browser && textarea) {
    textarea.value = $utilStore.copyText || '';
    textarea.select();
    document.execCommand('copy');
  }
</script>

<textarea bind:value={name} bind:this={textarea} />

<style>
  textarea {
    position: fixed;
    opacity: 0;
    pointer-events: none;
  }
</style>
